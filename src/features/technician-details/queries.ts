import { createClient } from "@/utils/supabase/server";

export async function findAllTechnicianDetails() {
  const supabase = await createClient();

  return await supabase.from("technician_details").select("*, departments(*)");
}

export async function findOneTechnicianDetails(userId: string) {
  const supabase = await createClient();

  return await supabase
    .from("technician_details")
    .select("*, departments(*)")
    .eq("id", userId)
    .single();
}

export async function findTechnicianSchedule(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("technician_details")
    .select("*")
    .eq("id", userId);

  if (error) {
    console.error("[findTechnicianScheduleError]:", error.message);
    return null;
  }

  return data;
}

export async function findTechnicianAppointments(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("work_orders")
    .select("id, appointment_start, appointment_end, job_details, department_id, service_type_id")
    .eq("technician_id", userId);

  if (error) {
    console.error("[findTechnicianAppointmentsError]:", error.message);
    return null;
  }

  return data;
}