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
  await reqRoles(["ADMIN"]);

  const supabase = await createClient();

  const { error } = await supabase
    .from("service_type_parts")
    .delete()
    .eq("service_type_id", serviceTypeId)
    .eq("part_id", partId);

  return { success: error ? false : true };
}
