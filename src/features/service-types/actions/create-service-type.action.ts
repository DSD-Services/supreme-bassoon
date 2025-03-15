"use server";

import { reqRoles } from "@/features/auth/queries";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function createServiceTypeAction(formData: FormData) {
  await reqRoles(["ADMIN"]);

  const name = formData.get("name") as string;

  const supabase = await createClient();

  const { error } = await supabase.from("service_types").insert({ name });

  if (error) {
    console.error("[errror]", error.message);
  }

  revalidatePath("/");
}
