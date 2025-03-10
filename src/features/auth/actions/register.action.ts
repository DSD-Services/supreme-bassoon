"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { UserRole } from "@/utils/supabase/types";

export async function registerAction(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const role = formData.get("role") as UserRole;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { first_name: firstName, last_name: lastName, role },
    },
  });

  if (error) {
    throw new Error("Registration failed");
  }

  revalidatePath("/", "layout");
  redirect("/login");
}
