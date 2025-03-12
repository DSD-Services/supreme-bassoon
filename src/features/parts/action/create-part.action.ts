"use server";

import { getAuthUser } from "@/features/auth/queries";
import { findOneProfile } from "@/features/profile/queries";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPartAction(formData: FormData) {
  const user = await getAuthUser();
  if (!user) redirect("/login");

  const { data: profile } = await findOneProfile(user.id);
  if (profile?.role !== "ADMIN") throw new Error("Unauthorized");

  const name = formData.get("name") as string;
  const quantity = formData.get("quantity") as string;

  const supabase = await createClient();

  const { error } = await supabase
    .from("parts")
    .insert({ name, quantity: +quantity });

  if (error) {
    console.error("[errror]", error.message);
  }

  revalidatePath("/");
}
