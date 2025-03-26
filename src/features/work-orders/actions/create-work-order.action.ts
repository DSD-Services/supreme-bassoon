"use server";

import { createClient } from "@/utils/supabase/server";
import { type CreateWorkOrderInput, CreateWorkOrderSchema } from "../schemas";
import { getAuthUser } from "@/features/auth/queries";
import { findAllServiceTypeParts } from "@/features/service-types/queries";
import { deleteWorkOrderAction } from "./delete-work-order.action";
import {
  sendWorkOrderEmails,
  type MissingPart,
  type ReservedPart,
} from "@/utils/email-service";
import { findOneProfile } from "@/features/profiles/queries";

export async function createWorkOrderAction(values: CreateWorkOrderInput) {
  // --[Authenticate and Authorize User]--------------------------
  const loggedInUser = await getAuthUser();

  if (!loggedInUser) {
    return { error: "Unauthorized" };
  }

  const { data: loggedInUserProfile, error: findOneProfileError } =
    await findOneProfile(loggedInUser.id);

  if (!loggedInUserProfile || findOneProfileError) {
    return { error: "Unauthorized" };
  }

  if (loggedInUserProfile.role !== "CLIENT") {
    return { error: "Forbidden" };
  }
  // -----------------------------------------------------------

  // --[Validate Work Order Create Input-------------------------
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
    jobDetails,
    primaryPhone,
    secondaryPhone,
  } = parsedValues.data;
  // -----------------------------------------------------------

  const supabase = await createClient();

  // --[Find all service type parts]-----------------------------
  const { data: serviceTypeParts, error: serviceTypePartsError } =
    await findAllServiceTypeParts(serviceTypeId);

  if (serviceTypePartsError) {
    console.error("[CreateWorkOrderError]:", serviceTypePartsError.message);
    return { error: "Oops! Something went wrong." };
  }
  // -----------------------------------------------------------

  // --[Partitions the parts into missing and reserved parts]---
  const missingParts: Array<{ partId: number; quantity: number }> = [];
  const reservedParts: Array<{ partId: number; quantity: number }> = [];

  serviceTypeParts.forEach((stp) => {
    const qtyRequired = stp.quantity;
    const qtyInStock = stp.parts.quantity;

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
  // -----------------------------------------------------------

  // --[Create the work order]----------------------------------
  const { data, error } = await supabase
    .from("work_orders")
    .insert({
      client_id: loggedInUserProfile.id,
      technician_id: technicianId,
      department_id: departmentId,
      service_type_id: serviceTypeId,
      appointment_start: appointmentStart,
      appointment_end: appointmentEnd,
      primary_phone: primaryPhone,
      ...(secondaryPhone ? { secondary_phone: secondaryPhone } : {}),
      status: "IN_PROGRESS", // FOR MVP
      ...(appointmentNotes ? { appointment_notes: appointmentNotes } : {}),
      job_details: jobDetails,
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
  // -----------------------------------------------------------

  // --[Create missing, reserved parts and update parts]--------
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
    await deleteWorkOrderAction(data[0].id);
    return { error: "Oops! Something went wrong." };
  }

  if (reservedPartsResults?.error) {
    console.error(
      "[CreateWorkOrderError]:",
      reservedPartsResults?.error.message,
    );
    await deleteWorkOrderAction(data[0].id);
    return { error: "Oops! Something went wrong." };
  }

  if (partsResults?.error) {
    console.error("[CreateWorkOrderError]:", partsResults?.error.message);
    await deleteWorkOrderAction(data[0].id);
    return { error: "Oops! Something went wrong." };
  }
  // -----------------------------------------------------------

  // --[Fetch service type name]--------------------------------
  const { data: serviceTypeData, error: serviceTypeError } = await supabase
    .from("service_types")
    .select("name")
    .eq("id", serviceTypeId)
    .single();

  if (serviceTypeError || !serviceTypeData) {
    console.error(
      "[CreateWorkOrderError]: Unable to fetch service type details.",
    );
    return { error: "Oops! Something went wrong while fetching service type." };
  }
  const serviceTypeName = serviceTypeData.name;
  // -----------------------------------------------------------

  // --[Fetch client and technician data]-----------------------
  const { data: technicianProfile, error: technicianProfileError } =
    await findOneProfile(technicianId);

  if (!technicianProfile || technicianProfileError) {
    console.error("[CreateWorkOrderError]: Unable to fetch technician data.");
    return {
      error: "Oops! Something went wrong while fetching technician data.",
    };
  }
  // -----------------------------------------------------------

  // --[Fetch reserved and missing parts details]--------------
  const reservedPartsWithDetails: ReservedPart[] = await Promise.all(
    reservedParts.map(async (part) => {
      const stp = serviceTypeParts.find((stp) => stp.parts.id === part.partId);
      const { data: reservedPartData } = await supabase
        .from("parts")
        .select("id, name, manufacturer")
        .eq("id", part.partId)
        .single();

      return {
        partId: part.partId,
        partName: reservedPartData?.name,
        manufacturer: reservedPartData?.manufacturer,
        quantityNeeded: stp?.quantity || 0,
        quantityReserved: part.quantity,
      };
    }),
  );

  const missingPartsWithDetails: MissingPart[] = await Promise.all(
    missingParts.map(async (part) => {
      const { data: partData } = await supabase
        .from("parts")
        .select("id, name, manufacturer")
        .eq("id", part.partId)
        .single();

      return {
        partId: part.partId,
        partName: partData?.name,
        manufacturer: partData?.manufacturer,
        quantity: part.quantity,
      };
    }),
  );
  // -----------------------------------------------------------

  // --[Send emails (non-blocking)]-----------------------------
  sendWorkOrderEmails({
    workOrderId: data[0].id.toString(),
    clientEmail: loggedInUserProfile.email,
    technicianEmail: technicianProfile.email,
    adminEmail: process.env.ADMIN_EMAIL || "",
    appointmentStart,
    appointmentEnd,
    serviceAddress,
    serviceTypeName,
    reservedParts: reservedPartsWithDetails,
    missingParts: missingPartsWithDetails,
    clientName: loggedInUserProfile.first_name,
    clientLastName: loggedInUserProfile.last_name,
    technicianName: technicianProfile.first_name,
    technicianLastName: technicianProfile.last_name,
    primaryPhone: loggedInUserProfile.primary_phone || "",
    secondaryPhone: loggedInUserProfile.secondary_phone || secondaryPhone || "",
    jobDetails: jobDetails || undefined,
    appointmentNotes: appointmentNotes || undefined,
  }).catch((error) => {
    console.error("[CreateWorkOrderError]: Error sending emails", error);
  });
  // -----------------------------------------------------------

  // --[Update client profile if missing info (non-blocking)]---
  const updatedClientProfilePayload = {
    ...(!loggedInUserProfile.address_line1 && serviceAddress.addressLine1
      ? { address_line1: serviceAddress.addressLine1 }
      : {}),
    ...(!loggedInUserProfile.address_line2 && serviceAddress.addressLine2
      ? { address_line2: serviceAddress.addressLine2 }
      : {}),
    ...(!loggedInUserProfile.city && serviceAddress.city
      ? { city: serviceAddress.city }
      : {}),
    ...(!loggedInUserProfile.state && serviceAddress.state
      ? { state: serviceAddress.state }
      : {}),
    ...(!loggedInUserProfile.postal_code && serviceAddress.postalCode
      ? { postal_code: serviceAddress.postalCode }
      : {}),
    ...(!loggedInUserProfile.primary_phone && primaryPhone
      ? { primary_phone: primaryPhone }
      : {}),
    ...(!loggedInUserProfile.secondary_phone && secondaryPhone
      ? { secondary_phone: secondaryPhone }
      : {}),
  };

  if (
    Object.keys(updatedClientProfilePayload).length > 0 &&
    loggedInUserProfile.role === "CLIENT"
  ) {
    supabase
      .from("profiles")
      .update(updatedClientProfilePayload)
      .eq("id", loggedInUser.id)
      .then((response) => {
        if (response.error) {
          console.error(
            "[CreateWorkOrderError]: Error updating client profile",
            response.error.message,
          );
        }
      });
  }
  // -----------------------------------------------------------

  return { error: null };
}
