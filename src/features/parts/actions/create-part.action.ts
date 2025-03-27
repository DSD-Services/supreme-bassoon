"use server";

import { reqRoles } from "@/features/auth/queries";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

type FormState = { error: string } | undefined;

export async function createPartAction(
  prevState: FormState,
  formData: FormData,
) {
  const profile = await reqRoles(["ADMIN"]);
  if (!profile) throw new Error("Forbidden");

  const name = formData.get("name") as string;
  const quantity = formData.get("quantity") as string;
  const manufacturer = formData.get("manufacturer") as string;

  if (!name || name.length < 3) {
    return { error: "Name must be at least 3 characters long" };
  }

  if (!quantity || isNaN(+quantity) || +quantity < 0) {
    return { error: "Quantity must be a non-negative number" };
  }

  if (manufacturer && manufacturer.length < 3) {
    return { error: "Manufacturer must be at least 3 characters long" };
  }

  const supabase = await createClient();

  const { error } = await supabase.from("parts").insert({
    name,
    quantity: +quantity,
    ...(manufacturer ? { manufacturer } : {}),
  });

  if (error) {
    console.error("[CreatePartError]", error.message);
  }

  revalidatePath("/");
}
