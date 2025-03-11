import { createClient } from "@/utils/supabase/server";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
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
