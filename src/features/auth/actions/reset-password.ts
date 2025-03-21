"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function resetPassword(newPassword: string) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookies().getAll(),
      },
    },
  );

  const { error } = await supabase.auth.updateUser({ password: newPassword });

  if (error) {
    return { error: error.message };
  }

  await supabase.auth.signOut();

  return { success: "Password updated! Redirecting to login..." };
}
