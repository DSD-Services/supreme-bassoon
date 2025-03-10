import { createClient } from "@/utils/supabase/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const departmentId = (await params).id;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("departments")
    .select("*")
    .eq("id", +departmentId)
    .single();
  return Response.json({ data, error });
}
