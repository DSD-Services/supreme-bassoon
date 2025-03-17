"use server";

import { createClient } from "@/utils/supabase/server";
import { AuthApiError } from "@supabase/supabase-js";

export type ActionState =
  | {
      success: false;
      error: string;
      defaultValues: { email: string };
    }
  | { success: true; error: null }
  | undefined;

export async function loginAction(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({
    email: email.toLowerCase(),
    password,
  });

  if (error) {
    console.error("[LoginError]:", error.message);
    if (error instanceof AuthApiError) {
      switch (error.code) {
        case "email_not_confirmed":
          return {
            success: false,
            error: "Please confirm your email address.",
            defaultValues: { email },
          };
        default:
          return {
            success: false,
            error: "Invalid credentials. Please try again.",
            defaultValues: { email },
          };
      }
    }
    return {
      success: false,
      error: "Oops! Something went wrong. Please try again.",
      defaultValues: { email },
    };
  }

  return { success: true, error: null };
}
