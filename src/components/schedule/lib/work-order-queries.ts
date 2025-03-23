import { DateTime } from "luxon";
import { createClient } from "@/utils/supabase/client";
import { APPOINTMENT_LEAD_TIME } from "../types/calendar.types";
import { generateTimeslots } from "./generate-timeslots";

export const fetchServiceTypes = async (departmentId: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("department_service_types")
    .select("service_types(*)")
    .eq("department_id", +departmentId);

  if (error) {
    return { data: null, error: "Failed to find service types" };
  }

  const serviceTypes = data?.map((x) => x.service_types || []);

  const sortedServiceTypes = serviceTypes.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  return { data: sortedServiceTypes, error: null };
};

export const fetchTimeslots = async (departmentId: string) => {
  const supabase = createClient();
  const timeZone = "America/Denver";

  const { data: technicians, error: techError } = await supabase
    .from("profiles")
    .select("*, technician_details!inner(*)")
    .eq("role", "TECHNICIAN")
    .eq("technician_details.department_id", +departmentId);

  if (techError) {
    return { data: null, error: "fetchTimeslots ERROR 1" };
  }

  if (!technicians || technicians.length === 0) {
    return { data: [], error: null };
  }

  const technicianIds = technicians.map((tech) => tech.id);

  const today = DateTime.now().setZone(timeZone);
  const tomorrow = today.plus({ days: 1 });
  const appointmentLeadTime = tomorrow.plus({
    days: Math.max(APPOINTMENT_LEAD_TIME, 1),
  });

  const { data: workOrders, error: workOrderError } = await supabase
    .from("work_orders")
    .select("id, technician_id, appointment_start, appointment_end")
    .in("technician_id", technicianIds)
    .gte("appointment_start", tomorrow.toISO())
    .lte("appointment_end", appointmentLeadTime.toISO());

  if (workOrderError) {
    return { data: null, error: "fetchTimeslots ERROR 2" };
  }

  const existingIds = workOrders.map((order) => order.id);
  const timeslots = generateTimeslots(technicians, workOrders, existingIds);

  return { data: timeslots, error: null };
};
