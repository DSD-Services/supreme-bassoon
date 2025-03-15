"use server";

import {
  protect,
  //  reqRoles
} from "@/features/auth/queries";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteWorkOrderAction(workOrderId: string | number) {
  //   await reqRoles(["ADMIN"]);
  await protect();

  const supabase = await createClient();

  const { error } = await supabase
    .from("work_orders")
    .delete()
    .eq("id", +workOrderId);

  if (error) {
    console.error("[error]", error.message);
  }

  revalidatePath("/");
}
