"use server";

import { reqRoles } from "@/features/auth/queries";
import { changeWorkOrderStatusEmail, sendEmail } from "@/utils/email-templates";
import { createClient } from "@/utils/supabase/server";
import { WorkOrderStatus } from "@/utils/supabase/types";

export async function updateWorkOrderStatusAction({
  workOrderId,
  status,
  aptStart,
  clientEmail,
}: {
  workOrderId: number;
  status: WorkOrderStatus;
  aptStart: string;
  clientEmail: string;
}) {
  const profile = await reqRoles(["CLIENT", "ADMIN", "TECHNICIAN"]);
  if (!profile) {
    return { error: "Unauthorized" };
  }

  const supabase = await createClient();

  const query = supabase
    .from("work_orders")
    .update({ status })
    .eq("id", workOrderId);

  if (status === "CANCELLED") {
    const { error } = await query;
    if (error) {
      return { error: error.message };
    } else {
      const emailTemplate = changeWorkOrderStatusEmail({
        workOrderId,
        newStatus: status,
        aptStart,
      });
      sendEmail(clientEmail, emailTemplate.subject, emailTemplate.html);
      return { error: null };
    }
  }

  if (profile?.role === "TECHNICIAN") {
    const { error } = await query.eq("technician_id", profile.id);
    if (error) {
      return { error: error?.message };
    } else {
      const emailTemplate = changeWorkOrderStatusEmail({
        workOrderId,
        newStatus: status,
        aptStart,
      });
      sendEmail(clientEmail, emailTemplate.subject, emailTemplate.html);
      return { error: null };
    }
  }

  if (profile?.role === "ADMIN") {
    const { error } = await query;
    if (error) {
      return { error: error?.message };
    } else {
      const emailTemplate = changeWorkOrderStatusEmail({
        workOrderId,
        newStatus: status,
        aptStart,
      });
      sendEmail(clientEmail, emailTemplate.subject, emailTemplate.html);
      return { error: null };
    }
  }

  return { error: "Oops! Something went wrong" };
}
