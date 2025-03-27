"use server";

import { protect } from "@/features/auth/queries";

import { findOneWorkOrders } from "../queries";
import { createClient } from "@/utils/supabase/server";
import { findOneProfile } from "@/features/profiles/queries";
import {
  ApptNotesInput,
  ApptNotesSchema,
} from "@/features/technician-details/components/schemas";

export async function updateApptNotes(
  workOrderId: number,
  values: ApptNotesInput,
) {
  const { userId } = await protect();

  const { data: profile } = await findOneProfile(userId);
  if (!profile) return { error: "Unauthenticated" };

  if (profile.role !== "ADMIN" && profile.role !== "TECHNICIAN") {
    return { error: "Unauthorized" };
  }

  const { data: workOrder } = await findOneWorkOrders(workOrderId);
  if (!workOrder) return { error: "Unable to fetch work order" };

  const parsedValues = ApptNotesSchema.safeParse(values);
  if (!parsedValues.success) {
    const error = parsedValues.error.issues?.[0].message;
    return { error };
  }

  const supabase = await createClient();

  const { appointmentNotes } = parsedValues.data;

  const updateData =
    appointmentNotes !== undefined
      ? { appointment_notes: appointmentNotes }
      : {};

  if (profile.role !== "ADMIN" && profile.role !== "TECHNICIAN") {
    return { error: "Unauthorized" };
  }

  const { error } = await supabase
    .from("work_orders")
    .update(updateData)
    .eq("id", workOrderId)
    .single();

  return { error: error ? error.message : null };
}
