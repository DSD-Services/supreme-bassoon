"use server";

import { reqRoles } from "@/features/auth/queries";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteDepartmentAction(departmentId: string | number) {
  await reqRoles(["ADMIN"]);

  const supabase = await createClient();

  const { error } = await supabase
    .from("departments")
    .delete()
    .eq("id", +departmentId);

  if (error) {
    console.error("[errror]", error.message);
  }

  revalidatePath("/");
}
