"use server";

import { reqRoles } from "@/features/auth/queries";
import { createClient } from "@/utils/supabase/server";

export async function updateDepartmentAction(
  departmentId: number,
  name: string,
) {
  const profile = await reqRoles(["ADMIN"]);
  if (!profile) throw new Error("Forbidden");

  if (!name || name.length < 3) {
    return { error: "Department name must be at least 3 characters long." };
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("departments")
    .update({ name })
    .eq("id", departmentId)
    .single();

  return { success: error ? false : true };
}
