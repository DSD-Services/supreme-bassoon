"use server";

import { createClient } from "@/utils/supabase/server";
import type { UserRole } from "@/utils/supabase/types";
import { RegisterInput, RegisterSchema } from "../schemas";
import { reqRoles } from "../queries";

export async function registerAction(
  values: RegisterInput,
  role: UserRole = "CLIENT",
) {
  if (role === "ADMIN") throw new Error("Forbidden");

  const parsedValues = RegisterSchema.safeParse(values);

  if (!parsedValues.success) {
    const [error] = parsedValues.error.issues;
    return { error: error.message };
  }

  const supabase = await createClient();

  const { data: existingUser } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", parsedValues.data.email)
    .single();

  if (existingUser) {
    return { error: "An account with this email is already registered." };
  }

  const { error } = await supabase.auth.signUp({
    email: parsedValues.data.email,
    password: parsedValues.data.password,
    options: {
      data: {
        first_name: parsedValues.data.firstName,
        last_name: parsedValues.data.lastName,
        role,
      },
    },
  });

  if (error) {
    console.error("[RegisterError]:", error);
    return { error: "Oops! Something went wrong." };
  }

  return { error: null };
}

export async function technicianRegisterAction(values: RegisterInput) {
  const profile = await reqRoles(["ADMIN"]);
  if (!profile) throw new Error("Unauthorized.");
  return registerAction(values, "TECHNICIAN");
}
