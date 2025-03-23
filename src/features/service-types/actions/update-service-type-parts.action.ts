"use server";

import { reqRoles } from "@/features/auth/queries";
import { createClient } from "@/utils/supabase/server";

export async function updateServiceTypePartsAction({
  serviceTypeId,
  partId,
  quantity,
}: {
  serviceTypeId: number;
  partId: number;
  quantity: number;
}) {
  const profile = await reqRoles(["ADMIN"]);
  if (!profile) throw new Error("Forbidden");

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("service_type_parts")
    .update({ quantity })
    .eq("service_type_id", serviceTypeId)
    .eq("part_id", partId);

  return { data, error, success: error ? false : true };
}
