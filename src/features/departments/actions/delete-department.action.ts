"use server";

import { reqRoles } from "@/features/auth/queries";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteDepartmentAction(departmentId: string | number) {
  const profile = await reqRoles(["ADMIN"]);
  if (!profile) throw new Error("Forbidden");

  const supabase = await createClient();

  const { error } = await supabase
    .from("departments")
    .delete()
    .eq("id", +departmentId);

  if (error) {
    console.error("[DeleteDepartmentError]", error.message);
  }

  revalidatePath("/");
}
