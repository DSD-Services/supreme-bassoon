"use server";

import { createClient } from "@/utils/supabase/server";
// import { AuthApiError } from '@supabase/supabase-js'
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (error) {
    // if (error instanceof AuthApiError) {
    //   switch (error.code) {
    //     case "email_not_confirmed":

    //   }
    // }
    throw new Error("Login failed");
  }

  revalidatePath("/", "layout");
  redirect("/account");
}
