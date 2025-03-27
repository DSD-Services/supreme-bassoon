"use server";

import { createAdminClient } from "@/utils/supabase/admin";
import { reqRoles } from "../../auth/queries";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function deleteUserAction(userId: string) {
  const profile = await reqRoles(["CLIENT", "TECHNICIAN", "ADMIN"]);
  if (!profile) throw new Error("Unauthorized");

  if (profile.role !== "ADMIN" && profile.id !== userId) {
    throw new Error("Unauthorized");
  }

  const supabase = createAdminClient();

  const { error } = await supabase.auth.admin.deleteUser(userId);

  if (error) {
    console.error("[deleteUserActionError]:", error.message);
    return { error: "Oops! Something went wrong." };
  }

  if (profile.id === userId) {
    await supabase.auth.signOut();
    redirect("/login");
  } else {
    revalidatePath("/admin");
  }

  return { error: null };
}
