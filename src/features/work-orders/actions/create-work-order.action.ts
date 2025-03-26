"use server";

import { createClient } from "@/utils/supabase/server";
import { type CreateWorkOrderInput, CreateWorkOrderSchema } from "../schemas";
import { reqRoles } from "@/features/auth/queries";
import { findAllServiceTypeParts } from "@/features/service-type-parts/queries";
import { deleteWorkOrderAction } from "./delete-work-order.action";
import {
  sendWorkOrderEmails,
  type MissingPart,
  type ReservedPart,
} from "@/utils/email-service";
import { HydratedWorkOrder } from "@/utils/supabase/types";

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
    jobDetails,
    primaryPhone,
    secondaryPhone,
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

  // Fetch the client's existing profile details
  const { data: clientProfile, error: clientProfileError } = await supabase
    .from("profiles")
    .select(
      "address_line1, address_line2, city, state, postal_code, primary_phone, secondary_phone",
    )
    .eq("id", profile.id)
    .single();

  if (clientProfileError) {
    console.error("[FetchClientProfileError]:", clientProfileError.message);
    return { error: "Could not retrieve client profile." };
  }

  // Check if contact info is missing
  const shouldUpdateProfile =
    !clientProfile.address_line1 ||
    !clientProfile.address_line2 ||
    !clientProfile.city ||
    !clientProfile.state ||
    !clientProfile.postal_code ||
    !clientProfile.primary_phone ||
    !clientProfile.secondary_phone;

  // Prepare updated contact info
  if (shouldUpdateProfile) {
    const updatedClientData: Partial<
      HydratedWorkOrder["service_address"] & {
        primary_phone?: string;
        secondary_phone?: string;
      }
    > = {};

    // Update address only if missing
    if (!clientProfile.address_line1 && serviceAddress.addressLine1) {
      updatedClientData.address_line1 = serviceAddress.addressLine1;
    }

    if (!clientProfile.address_line2 && serviceAddress.addressLine2) {
      updatedClientData.address_line2 = serviceAddress.addressLine2;
    }

    if (!clientProfile.city && serviceAddress.city) {
      updatedClientData.city = serviceAddress.city;
    }

    if (!clientProfile.state && serviceAddress.state) {
      updatedClientData.state = serviceAddress.state;
    }

    if (!clientProfile.postal_code && serviceAddress.postalCode) {
      updatedClientData.postal_code = serviceAddress.postalCode;
    }

    // Update phones only if missing
    if (!clientProfile.primary_phone && primaryPhone) {
      updatedClientData.primary_phone = primaryPhone;
    }

    if (!clientProfile.secondary_phone && secondaryPhone) {
      updatedClientData.secondary_phone = secondaryPhone;
    }

    // Only update if there are fields to update
    if (Object.keys(updatedClientData).length > 0) {
      const { error: updateProfileError } = await supabase
        .from("profiles")
        .update(updatedClientData)
        .eq("id", profile.id);

      if (updateProfileError) {
        console.error(
          "[UpdateClientProfileError]:",
          updateProfileError.message,
        );
        return { error: "Could not update client profile." };
      }
    }
  }

  const { data, error } = await supabase
    .from("work_orders")
    .insert({
      client_id: profile.id,
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

  // Get service type name
  const { data: serviceTypeData, error: serviceTypeError } = await supabase
    .from("service_types")
    .select("name")
    .eq("id", serviceTypeId)
    .single();

  if (serviceTypeError) {
    console.error(
      "[CreateWorkOrderError]: Unable to fetch service type details.",
    );
  }

  const serviceTypeName = serviceTypeData?.name || "DSD Service";

  // Fetch the client's profile data
  const { data: clientData, error: clientError } = await supabase
    .from("profiles")
    .select("email, first_name, last_name, primary_phone, secondary_phone")
    .eq("id", profile.id)
    .single();

  if (clientError || !clientData) {
    console.error("[CreateWorkOrderError]: Unable to fetch client data.");
    return {
      error: "Oops! Something went wrong while fetching client data.",
    };
  }

  // Fetch the technician's data
  const { data: technicianData, error: technicianError } = await supabase
    .from("profiles")
    .select("email, first_name, last_name")
    .eq("id", technicianId)
    .single();

  if (technicianError || !technicianData) {
    console.error("[CreateWorkOrderError]: Unable to fetch technician data.");
    return {
      error: "Oops! Something went wrong while fetching technician data.",
    };
  }

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

  // Process missing parts with details
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

  // Send all emails
  try {
    await sendWorkOrderEmails({
      workOrderId: data[0].id.toString(),
      clientEmail: clientData.email,
      technicianEmail: technicianData.email,
      adminEmail: process.env.ADMIN_EMAIL || "",
      appointmentStart,
      appointmentEnd,
      serviceAddress,
      serviceTypeName,
      reservedParts: reservedPartsWithDetails,
      missingParts: missingPartsWithDetails,
      clientName: clientData.first_name,
      clientLastName: clientData.last_name,
      technicianName: technicianData.first_name,
      technicianLastName: technicianData.last_name,
      primaryPhone: clientData.primary_phone || "",
      secondaryPhone: clientData.secondary_phone || secondaryPhone || "",
      jobDetails: jobDetails || undefined,
      appointmentNotes: appointmentNotes || undefined,
    });
  } catch (error) {
    console.error("[CreateWorkOrderError]: Error sending emails", error);
  }

  return { error: null };
}
