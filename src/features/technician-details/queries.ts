import { createClient } from "@/utils/supabase/server";
import { protect } from "@/features/auth/queries";

export async function findAllTechnicianDetails() {
  await protect();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("technician_details")
    .select("*, departments(*)");

  return { data, error };
}

export async function findOneTechnicianDetails(userId: string) {
  await protect();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("technician_details")
    .select("*, departments(*)")
    .eq("id", userId)
    .single();

  return { data, error };
}
