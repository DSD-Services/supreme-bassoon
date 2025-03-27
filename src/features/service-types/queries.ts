import { createClient } from "@/utils/supabase/server";

type FindAllServiceTypesOptions = { query?: string };

export async function findAllServiceTypes(
  options: FindAllServiceTypesOptions = {},
) {
  const supabase = await createClient();

  const query = supabase
    .from("service_types")
    .select("*, department_service_types(*, departments(*))");

  if (options.query) {
    query.ilike("name", `%${options.query}%`);
  }

  return query.order("name", { ascending: true });
}

export async function findOneServiceType(serviceTypeId: number) {
  const supabase = await createClient();

  return await supabase
    .from("service_types")
    .select("*")
    .eq("id", serviceTypeId)
    .single();
}
