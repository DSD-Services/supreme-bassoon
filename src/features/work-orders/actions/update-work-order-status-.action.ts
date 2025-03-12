"use server";

import { authorize, reqTechnicianOrAdmin } from "@/features/auth/queries";
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
    await authorize();
    const { error } = await query;
    return { error };
  }

  const { id, role } = await reqTechnicianOrAdmin();
  if (role === "TECHNICIAN") {
    const { error } = await query.eq("technician_id", id);
    return { error };
  }

  if (role === "ADMIN") {
    const { error } = await query;
    return { error };
  }

  return { error: { message: "Oops! Something went wrong" } };
}
