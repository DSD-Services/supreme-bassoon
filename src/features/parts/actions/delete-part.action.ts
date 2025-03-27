"use server";

import { reqRoles } from "@/features/auth/queries";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function deletePartAction(partId: string | number) {
  const profile = await reqRoles(["ADMIN"]);
  if (!profile) throw new Error("Forbidden");

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("parts")
    .delete()
    .eq("id", +partId);

  if (error) {
    console.error("[DeletePartError]", error.message);
  }

  revalidatePath("/");

  return { data, error };
}
