"use server";

import { reqRoles } from "@/features/auth/queries";
import {
  TechnicianDetailsInput,
  TechnicianDetailsSchema,
} from "@/features/technician-details/schemas";
import { createClient } from "@/utils/supabase/server";

export async function updateTechnicianDetails(
  technicianId: string,
  values: TechnicianDetailsInput,
) {
  const profile = await reqRoles(["ADMIN", "CLIENT", "TECHNICIAN"]);
  if (!profile) throw new Error("Forbidden");

  if (profile.role !== "ADMIN" && profile.id !== technicianId) {
    return { error: "Unauthorized" };
  }

  const parsedValues = TechnicianDetailsSchema.safeParse(values);

  if (!parsedValues.success) {
    const error = parsedValues.error.issues?.[0].message;
    return { error };
  }

  const supabase = await createClient();

  const {
    breakEndTime,
    breakStartTime,
    departmentId,
    workDays,
    workEndTime,
    workStartTime,
  } = parsedValues.data;

  return await supabase
    .from("technician_details")
    .update({
      ...(breakEndTime ? { break_end_time: breakEndTime } : {}),
      ...(breakStartTime ? { break_start_time: breakStartTime } : {}),
      ...(departmentId ? { department_id: departmentId } : {}),
      ...(workDays ? { work_days: workDays } : {}),
      ...(workEndTime ? { work_end_time: workEndTime } : {}),
      ...(workStartTime ? { work_start_time: workStartTime } : {}),
    })
    .eq("id", technicianId);
}
