import { createClient } from "@/utils/supabase/server";
import { type NextRequest, NextResponse } from "next/server";
import { generateTimeslots } from "@/features/schedule/lib/generate-timeslots";
import { APPOINTMENT_LEAD_TIME } from "@/features/schedule/types/calendar.types";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const departmentId = parseInt(id, 10);

  if (isNaN(departmentId)) {
    return NextResponse.json(
      { error: "Invalid department ID" },
      { status: 400 },
    );
  }

  const supabase = await createClient();

  const { data: technicians, error: techError } = await supabase
    .from("profiles")
    .select(
      "id, first_name, last_name, technician_details!inner(department_id, work_days, work_start_time, work_end_time, break_start_time, break_end_time)",
    )
    .eq("role", "TECHNICIAN")
    .eq("technician_details.department_id", departmentId);

  if (techError) {
    return NextResponse.json({ error: techError.message }, { status: 500 });
  }

  if (!technicians || technicians.length === 0) {
    return NextResponse.json({ technicians: [], workOrders: [] });
  }

  const technicianIds = technicians.map((tech) => tech.id);

  const today = new Date();
  const tomorrow = new Date(today.getDate() + 1);
  const appointmentLeadTime = new Date(today.getDate());
  appointmentLeadTime.setDate(tomorrow.getDate() + APPOINTMENT_LEAD_TIME);

  // const todayStr = today.toISOString();
  // const thirtyDaysAheadStr = thirtyDaysAhead.toISOString();

  const { data: workOrders, error: workOrderError } = await supabase
    .from("work_orders")
    .select("id, technician_id, appointment_start, appointment_end")
    .in("technician_id", technicianIds);
  // .gte("appointment_start", todayStr) // Filter appointments after today
  // .lt("appointment_start", thirtyDaysAheadStr); // Filter appointments before 30 days ahead

  if (workOrderError) {
    return NextResponse.json(
      { error: workOrderError.message },
      { status: 500 },
    );
  }

  const existingIds = workOrders.map((order) => order.id);
  const timeslots = generateTimeslots(technicians, workOrders, existingIds);

  return NextResponse.json({ technicians, workOrders, timeslots });
}
