import { createClient } from "@/utils/supabase/server";
import { notFound, redirect } from "next/navigation";

export async function isAdmin(
  { action }: { action: "throw" | "redirect" } = { action: "throw" },
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    if (action === "redirect") redirect("/login");
    throw new Error("Unauthorized");
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .eq("role", "ADMIN")
    .single();

  if (error) {
    console.error("[IsAdminError]:", error);
    throw error;
  }

  if (!profile?.id) {
    if (action === "redirect") notFound();
    throw new Error("Forbidden");
  }
}
