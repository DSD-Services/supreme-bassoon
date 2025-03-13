"use server";

import { protect } from "@/features/auth/queries";
import { TechnicianDetailsInput, TechnicianDetailsSchema } from "../schemas";
import { findOneProfile } from "@/features/profiles/queries";
import { createClient } from "@/utils/supabase/server";

export async function updateTechnicianDetails(
  technicianId: string,
  values: TechnicianDetailsInput,
) {
  const { userId } = await protect();

  const { data: profile } = await findOneProfile(userId);
  if (!profile) return { error: "Unauthenticated" };

  if (profile.role !== "ADMIN" && userId !== technicianId) {
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

  const { error } = await supabase.from("technician_details").upsert({
    id: technicianId,
    ...(breakEndTime ? { break_end_time: breakEndTime } : {}),
    ...(breakStartTime ? { break_start_time: breakStartTime } : {}),
    ...(departmentId ? { department_id: departmentId } : {}),
    ...(workDays ? { work_days: workDays } : {}),
    ...(workEndTime ? { work_end_time: workEndTime } : {}),
    ...(workStartTime ? { work_start_time: workStartTime } : {}),
  });

  return { error: error ? error.message : null };
}
