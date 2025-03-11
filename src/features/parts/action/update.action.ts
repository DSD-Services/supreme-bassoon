"use server";

import { getAuthUser } from "@/features/auth/queries";
import { findOneProfile } from "@/features/profile/queries";
import { createClient } from "@/utils/supabase/server";

export async function updatePart(partId: number, quantity: number) {
  const user = await getAuthUser();
  if (!user) return { error: "Unauthenticated" };

  const { data: profile } = await findOneProfile(user.id);
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
