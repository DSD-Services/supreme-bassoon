"use server";

import { reqRoles } from "@/features/auth/queries";
import { createClient } from "@/utils/supabase/server";

export async function deleteServiceTypePartsAction({
  serviceTypeId,
  partId,
}: {
  serviceTypeId: number;
  partId: number;
}) {
  const profile = await reqRoles(["ADMIN"]);
  if (!profile) throw new Error("Forbidden");

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("service_type_parts")
    .delete()
    .eq("service_type_id", serviceTypeId)
    .eq("part_id", partId);

  return { data, error, success: error ? false : true };
}
