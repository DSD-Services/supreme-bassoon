"use server";

import { reqRoles } from "@/features/auth/queries";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function createPartAction(formData: FormData) {
  await reqRoles(["ADMIN"]);

  const name = formData.get("name") as string;
  const quantity = formData.get("quantity") as string;

  const supabase = await createClient();

  const { error } = await supabase
    .from("parts")
    .insert({ name, quantity: +quantity });

  if (error) {
    console.error("[CreatePartError]", error.message);
  }

  revalidatePath("/");
}
