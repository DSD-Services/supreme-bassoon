"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function resendEmailAction(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    throw new Error("You are already logged in.");
  }

  const parsedEmail = z.string().email().parse(formData.get("email"));

  await supabase.auth.resend({
    email: parsedEmail,
    type: "signup",
  });

  redirect("/register/success");
}
