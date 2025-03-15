"use server";

import { protect, reqRoles } from "@/features/auth/queries";
import { createClient } from "@/utils/supabase/server";
import { WorkOrderStatus } from "@/utils/supabase/types";

export async function updateWorkOrderStatusAction(
  workOrderId: number,
  status: WorkOrderStatus,
) {
  const supabase = await createClient();

  const query = supabase
    .from("work_orders")
    .update({ status })
    .eq("id", workOrderId);

  if (status === "CANCELLED") {
    await protect();
    const { error } = await query;
    return { error };
  }

  const profile = await reqRoles(["ADMIN", "TECHNICIAN"]);

  if (profile?.role === "TECHNICIAN") {
    const { error } = await query.eq("technician_id", profile.id);
    return { error };
  }

  if (profile?.role === "ADMIN") {
    const { error } = await query;
    return { error };
  }

  return { error: { message: "Oops! Something went wrong" } };
}
