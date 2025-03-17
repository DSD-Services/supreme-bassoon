"use server";

import { reqRoles } from "@/features/auth/queries";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteServiceTypeAction(serviceTypeId: string | number) {
  await reqRoles(["ADMIN"]);

  const supabase = await createClient();

  const { error } = await supabase
    .from("service_types")
    .delete()
    .eq("id", +serviceTypeId);

  if (error) {
    console.error("[DeleteServiceTypeError]", error.message);
  }

  revalidatePath("/");
}
