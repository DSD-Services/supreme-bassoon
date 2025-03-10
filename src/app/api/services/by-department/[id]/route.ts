// TODO test if this will retrieve department service types
// based on department id

// utilized in work order form to populate step 1 select
// for service type

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
    .from("department_service_types")
    .select("service_types(*)")
    .eq("department_id", departmentId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const serviceTypesData = data?.map((entry) => entry.service_types || []);

  return NextResponse.json({ data: serviceTypesData }, { status: 200 });
}
