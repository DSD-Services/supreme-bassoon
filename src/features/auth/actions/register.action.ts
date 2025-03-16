"use server";

import { createClient } from "@/utils/supabase/server";
import { RegisterInput, RegisterSchema } from "../schemas";

export async function registerAction(values: RegisterInput) {
  const parsedValues = RegisterSchema.safeParse(values);

  if (!parsedValues.success) {
    const [error] = parsedValues.error.issues;
    return { error: error.message };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email: parsedValues.data.email,
    password: parsedValues.data.password,
    options: {
      data: {
        first_name: parsedValues.data.firstName,
        last_name: parsedValues.data.lastName,
        role: "CLIENT",
      },
    },
  });

  if (error) {
    console.error("[RegisterActionError]:", error);
    return { error: "Oops! Something went wrong." };
  }

  return { error: null };
}
