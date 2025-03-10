// TODO test if this will retrieve technicians
// based on department id

// utilized in work order form to populate available timeslots

import { createClient } from "@/utils/supabase/server";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const departmentId = parseInt(params.id, 10);

  if (isNaN(departmentId)) {
    return NextResponse.json(
      { error: "Invalid department ID" },
      { status: 400 },
    );
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("technician_details")
    .select("profiles(id, name, email)")
    .eq("department_id", departmentId)
    .eq("profiles.role", "TECHNICIAN");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ data }, { status: 200 });
}
