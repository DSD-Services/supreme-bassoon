"use server";

import { reqRoles } from "@/features/auth/queries";
import { createClient } from "@/utils/supabase/server";

export async function updateServiceTypeAction(
  serviceTypeId: number,
  name: string,
) {
  await reqRoles(["ADMIN"]);

  const supabase = await createClient();

  const { error } = await supabase
    .from("service_types")
    .update({ name })
    .eq("id", serviceTypeId)
    .single();

  return { success: error ? false : true };
}
