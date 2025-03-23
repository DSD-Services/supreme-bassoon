import { createClient } from "@/utils/supabase/server";

export async function findAllTechnicianDetails() {
  const supabase = await createClient();

  return await supabase.from("technician_details").select("*, departments(*)");
}

export async function findOneTechnicianDetails(userId: string) {
  const supabase = await createClient();

  return await supabase
    .from("technician_details")
    .select("*, departments(*)")
    .eq("id", userId)
    .single();
}
