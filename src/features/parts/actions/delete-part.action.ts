"use server";

import { reqRoles } from "@/features/auth/queries";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function deletePartAction(partId: string | number) {
  await reqRoles(["ADMIN"]);

  const supabase = await createClient();

  const { error } = await supabase.from("parts").delete().eq("id", +partId);

  if (error) {
    console.error("[DeletePartError]", error.message);
  }

  revalidatePath("/");
}
