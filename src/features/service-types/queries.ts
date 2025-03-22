import { createClient } from "@/utils/supabase/server";

export async function findAllServiceTypes() {
  const supabase = await createClient();

  return await supabase
    .from("service_types")
    .select("*, department_service_types(*, departments(*))")
    .order("name", { ascending: true });
}

export async function findOneServiceType(serviceTypeId: number) {
  const supabase = await createClient();

  return await supabase
    .from("service_types")
    .select("*")
    .eq("id", serviceTypeId)
    .single();
}

export async function findAllServiceTypeParts(serviceTypeId: number) {
  const supabase = await createClient();

  return await supabase
    .from("service_type_parts")
    .select("*, parts(*)")
    .eq("service_type_id", serviceTypeId)
    .order("id", { ascending: true });
}
