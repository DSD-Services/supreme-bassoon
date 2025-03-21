"use server";

import { createClient } from "@supabase/supabase-js";

export async function sendPasswordReset(email: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
  });

  if (error) {
    return { error: error.message };
  }

  return {
    success:
      "If this email is registered, check your inbox for the reset link.",
  };
}
