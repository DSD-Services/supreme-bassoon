"use server";

import { reqRoles } from "@/features/auth/queries";
import { createClient } from "@/utils/supabase/server";

export async function updateDepartmentAction(
  departmentId: number,
  name: string,
) {
  await reqRoles(["ADMIN"]);

  const supabase = await createClient();
  const { error } = await supabase
    .from("departments")
    .update({ name })
    .eq("id", departmentId)
    .single();

  return { success: error ? false : true };
}
