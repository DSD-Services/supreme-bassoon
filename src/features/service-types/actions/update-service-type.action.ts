"use server";

import { reqRoles } from "@/features/auth/queries";
import { createClient } from "@/utils/supabase/server";

export async function updateServiceTypeAction(
  serviceTypeId: number,
  name: string,
) {
  const profile = await reqRoles(["ADMIN"]);
  if (!profile) throw new Error("Forbidden");

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("service_types")
    .update({ name })
    .eq("id", serviceTypeId)
    .single();

  return { data, error, success: error ? false : true };
}
