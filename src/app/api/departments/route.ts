import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("departments").select("*");
  return Response.json({ data, error });
}
