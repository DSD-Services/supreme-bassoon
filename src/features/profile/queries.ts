import { createClient } from "@/utils/supabase/server";
import { UserRole } from "@/utils/supabase/types";
import { authorize } from "@/features/auth/queries";

type Options = { role?: UserRole };

export async function findOneProfile(userId: string, options: Options = {}) {
  await authorize();

  const supabase = await createClient();

  const { role } = options;

  let query = supabase.from("profiles").select("*").eq("id", userId);
  if (role) query = query.eq("role", role);

  const { data, error } = await query.single();

  return { data, error };
}
