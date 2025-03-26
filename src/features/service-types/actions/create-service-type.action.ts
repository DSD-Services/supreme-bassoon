"use server";

import { isAdmin } from "@/features/auth/auth-guards";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

type FormState = { error?: string } | undefined;

export async function createServiceTypeAction(
  prevState: FormState,
  formData: FormData,
) {
  await isAdmin();

  const name = formData.get("name") as string;

  if (!name || name.length < 3) {
    return { error: "Name must be at least 3 characters long" };
  }

  const supabase = await createClient();

  const { error } = await supabase.from("service_types").insert({ name });

  if (error) {
    console.error("[CreateServiceTypeError]", error.message);
    return { error: "Oops! Something went wrong" };
  }

  revalidatePath("/");
}
