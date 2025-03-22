"use server";

import { reqRoles } from "@/features/auth/queries";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteServiceTypeAction(serviceTypeId: string | number) {
  const profile = await reqRoles(["ADMIN"]);
  if (!profile) throw new Error("Forbidden");

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("service_types")
    .delete()
    .eq("id", +serviceTypeId);

  return { data, error };

  revalidatePath("/");
}
