"use server";

import { createClient } from "@/utils/supabase/server";
import { type CreateWorkOrderInput, CreateWorkOrderSchema } from "../schemas";
import { reqRoles } from "@/features/auth/queries";
import { findAllServiceTypeParts } from "@/features/service-types/queries";
import { deleteWorkOrderAction } from "./delete-work-order.action";

export async function createWorkOrderAction(values: CreateWorkOrderInput) {
  const profile = await reqRoles(["CLIENT", "ADMIN"]);
  if (!profile) {
    return { error: "You are not authorized to create this work order." };
  }

  const parsedValues = CreateWorkOrderSchema.safeParse(values);

  if (!parsedValues.success) {
    return { error: parsedValues.error.issues[0].message };
  }

  const {
    technicianId,
    appointmentEnd,
    appointmentNotes,
    appointmentStart,
    departmentId,
    serviceAddress,
    serviceTypeId,
  } = parsedValues.data;

  const supabase = await createClient();

  // First Find The Need Parts For This Service
  const { data: serviceTypeParts, error: serviceTypePartsError } =
    await findAllServiceTypeParts(serviceTypeId);

  if (serviceTypePartsError) {
    console.error("[CreateWorkOrderError]:", serviceTypePartsError.message);
    return { error: "Oops! Something went wrong." };
  }

  const missingParts: Array<{ partId: number; quantity: number }> = [];
  const reservedParts: Array<{ partId: number; quantity: number }> = [];

  serviceTypeParts.forEach((stp) => {
    const qtyRequired = stp.quantity; // 5
    const qtyInStock = stp.parts.quantity; // 3

    if (qtyRequired <= qtyInStock) {
      reservedParts.push({
        partId: stp.parts.id,
        quantity: qtyRequired,
      });
    } else {
      const qtyMissing = qtyRequired - qtyInStock;
      missingParts.push({
        partId: stp.parts.id,
        quantity: qtyMissing,
      });
      reservedParts.push({
        partId: stp.parts.id,
        quantity: qtyInStock,
      });
    }
  });

  const { data, error } = await supabase
    .from("work_orders")
    .insert({
      client_id: profile.id,
      technician_id: technicianId,
      department_id: departmentId,
      service_type_id: serviceTypeId,
      appointment_start: appointmentStart,
      appointment_end: appointmentEnd,
      ...(appointmentNotes ? { appointment_notes: appointmentNotes } : {}),
      service_address: {
        address_line1: serviceAddress.addressLine1,
        ...(serviceAddress.addressLine2
          ? { address_line2: serviceAddress.addressLine2 }
          : {}),
        city: serviceAddress.city,
        state: serviceAddress.state,
        postal_code: serviceAddress.postalCode,
      },
    })
    .select("id");

  if (error) {
    console.error("[CreateWorkOrderError]:", error.message);
    return { error: "Oops! Something went wrong." };
  }

  const missingPartsQueries = missingParts.map((missingPart) => {
    return supabase
      .from("missing_parts")
      .insert({
        work_order_id: data[0].id,
        part_id: missingPart.partId,
        quantity: missingPart.quantity,
      })
      .select("id");
  });

  const reservedPartsQueries = reservedParts.map((reservedPart) => {
    return supabase
      .from("reserved_parts")
      .insert({
        work_order_id: data[0].id,
        part_id: reservedPart.partId,
        quantity: reservedPart.quantity,
      })
      .select("id");
  });

  const partsQueries = reservedParts.map((reservedPart) => {
    const stp = serviceTypeParts.find(
      (stp) => stp.parts.id === reservedPart.partId,
    );
    if (!stp) {
      throw new Error(
        `Service Type Part not found for partId: ${reservedPart.partId}`,
      );
    }

    return supabase
      .from("parts")
      .update({
        quantity: stp.parts.quantity - reservedPart.quantity,
      })
      .eq("id", reservedPart.partId)
      .select("id");
  });

  const [missingPartsResults, reservedPartsResults, partsResults] =
    await Promise.all([
      ...missingPartsQueries,
      ...reservedPartsQueries,
      ...partsQueries,
    ]);

  if (missingPartsResults?.error) {
    console.error(
      "[CreateWorkOrderError]:",
      missingPartsResults?.error.message,
    );
    await deleteWorkOrderAction(data[0].id); // CLEAN UP
    return { error: "Oops! Something went wrong." };
  }

  if (reservedPartsResults?.error) {
    console.error(
      "[CreateWorkOrderError]:",
      reservedPartsResults?.error.message,
    );
    await deleteWorkOrderAction(data[0].id); // CLEAN UP
    return { error: "Oops! Something went wrong." };
  }

  if (partsResults?.error) {
    console.error("[CreateWorkOrderError]:", partsResults?.error.message);
    await deleteWorkOrderAction(data[0].id); // CLEAN UP
    return { error: "Oops! Something went wrong." };
  }

  // Send the order confirmation to the technician
  const { data: technicianData, error: technicianError } = await supabase
    .from("profiles")
    .select("email")
    .eq("id", technicianId)
    .single();

  if (technicianError || !technicianData) {
    console.error("[CreateWorkOrderError]: Unable to fetch technician email.");
    return {
      error: "Oops! Something went wrong while fetching technician email.",
    };
  }

  const technicianEmail = technicianData.email;

  const missingPartsMessage = missingParts.length
    ? `Missing Parts:\n${missingParts
        .map((part) => `Part: ${part.partId}, Quantity: ${part.quantity}`)
        .join("\n")}`
    : "All required parts are available.";

  const emailText = `
    New Work Order Assigned
    You have been assigned a new work order.

    Appointment Time: ${appointmentStart} - ${appointmentEnd}
    Service Address: ${serviceAddress.addressLine1}, ${serviceAddress.city}

    ${missingPartsMessage}
    `;

  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/mailer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      to: technicianEmail,
      subject: "New Work Order Assigned",
      text: emailText,
    }),
  });

  return { error: null };
}
