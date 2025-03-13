"use server";

import { protect } from "@/features/auth/queries";
import { findOneProfile } from "@/features/profiles/queries";
import { createClient } from "@/utils/supabase/server";

export async function updatePartAction(partId: number, quantity: number) {
  const { userId } = await protect();

  const { data: profile } = await findOneProfile(userId);
  if (!profile) return { error: "Unauthenticated" };

  if (!["TECHNICIAN", "ADMIN"].includes(profile.role)) {
    return { error: "Unauthorized" };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("parts")
    .update({ quantity })
    .eq("id", partId)
    .single();

  return { success: error ? false : true };
}
