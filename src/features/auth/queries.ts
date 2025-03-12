import { createClient } from "@/utils/supabase/server";

export async function getAuthUser() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function authorize() {
  const user = await getAuthUser();
  if (!user) throw new Error("Unauthorized");
}

export async function reqAdmin() {
  const user = await getAuthUser();
  if (!user) throw new Error("Unauthorized");

  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .eq("role", "ADMIN")
    .single();

  if (!profile) throw new Error("Forbidden");
  return profile;
}

export async function reqTechnicianOrAdmin() {
  const user = await getAuthUser();
  if (!user) throw new Error("Unauthorized");

  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("id, role")
    .eq("id", user.id)
    .in("role", ["ADMIN", "TECHNICIAN"])
    .single();

  if (!profile) throw new Error("Forbidden");
  return profile;
}
