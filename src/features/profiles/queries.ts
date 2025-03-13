import { createClient } from "@/utils/supabase/server";
import { UserRole } from "@/utils/supabase/types";
import { protect } from "@/features/auth/queries";

type Options = { role?: UserRole };

export async function findAllProfiles(options: Options = {}) {
  await protect();

  const supabase = await createClient();
  const { role } = options;

  let query = supabase.from("profiles").select("*");

  if (role === "TECHNICIAN") {
    query = supabase
      .from("profiles")
      .select("*, technician_details(*, departments(*))");
  }

  if (role) query = query.eq("role", role);

  return await query.order("first_name", { ascending: true });
}

export async function findOneProfile(userId: string, options: Options = {}) {
  await protect();

  const supabase = await createClient();
  const { role } = options;

  let query = supabase.from("profiles").select("*").eq("id", userId);
  if (role) query = query.eq("role", role);

  return await query.single();
}
