import { createClient } from "@/utils/supabase/server";

export async function findAllServiceTypeParts(serviceTypeId: number) {
  const supabase = await createClient();

  return await supabase
    .from("service_type_parts")
    .select("*, parts(*)")
    .eq("service_type_id", serviceTypeId)
    .order("id", { ascending: true });
}
