"use server";

import { getAuthUser } from "@/features/auth/queries";
import { findOneProfile } from "@/features/profiles/queries";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deletePartAction(partId: string | number) {
  const user = await getAuthUser();
  if (!user) redirect("/login");

  const { data: profile } = await findOneProfile(user.id);
  if (profile?.role !== "ADMIN") throw new Error("Unauthorized");

  const supabase = await createClient();

  const { error } = await supabase.from("parts").delete().eq("id", +partId);

  if (error) {
    console.error("[errror]", error.message);
  }

  revalidatePath("/");
}
