import { createClient } from "@/utils/supabase/server";
import { protect } from "@/features/auth/queries";

export async function findAllServiceTypes() {
  await protect();
  const supabase = await createClient();

  return await supabase
    .from("service_types")
    .select("*, departments(*)")
    .order("id", { ascending: true });
}

export async function findOneServiceType(serviceTypeId: number) {
  await protect();
  const supabase = await createClient();

  return await supabase
    .from("service_types")
    .select("*")
    .eq("id", serviceTypeId)
    .single();
}

export async function findAllServiceTypeParts(serviceTypeId: number) {
  await protect();
  const supabase = await createClient();

  return await supabase
    .from("service_type_parts")
    .select("*, parts(*)")
    .eq("service_type_id", serviceTypeId)
    .order("id", { ascending: true });
}
