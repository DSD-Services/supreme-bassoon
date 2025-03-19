import { createClient } from "@/utils/supabase/server";
import type { UserRole } from "@/utils/supabase/types";
import { redirect } from "next/navigation";

export async function getAuthUser() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function protect(
  { action }: { action: "throw" | "redirect" } = { action: "throw" },
) {
  const user = await getAuthUser();
  if (!user) {
    if (action === "redirect") redirect("/login");
    throw new Error("Unauthorized");
  }

  return { userId: user.id };
}

export async function reqRoles(roles: UserRole[]) {
  const { userId } = await protect();

  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("id, role")
    .eq("id", userId)
    .in("role", roles)
    .single();

  return profile;
}

export async function getUserRole() {
  const { userId } = await protect();

  const supabase = await createClient();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching user role:", error.message);
    return null;
  }

  return profile?.role || null;
}
