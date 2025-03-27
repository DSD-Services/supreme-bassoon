"use server";

import { reqRoles } from "@/features/auth/queries";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

type FormState = { error: string | null; success: boolean } | undefined;

export async function updatePartAction(
  partId: number,
  prevState: FormState,
  formData: FormData,
) {
  const profile = reqRoles(["ADMIN"]);
  if (!profile) throw new Error("Forbidden");

  const name = formData.get("name") as string;
  const quantity = formData.get("quantity") as string;
  const manufacturer = formData.get("manufacturer") as string;

  if (!name || name.length < 3) {
    return { error: "Name must be at least 3 characters long", success: false };
  }

  if (!quantity || isNaN(+quantity) || +quantity < 0) {
    return { error: "Quantity must be a non-negative number", success: false };
  }

  if (manufacturer && manufacturer.length < 3) {
    return {
      error: "Manufacturer must be at least 3 characters long",
      success: false,
    };
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("parts")
    .update({
      name,
      quantity: +quantity,
      ...(manufacturer ? { manufacturer } : {}),
    })
    .eq("id", partId)
    .single();

  if (error) {
    return {
      error: "Oops! Something went wrong while updating.",
      success: false,
    };
  }

  revalidatePath("/");
  return { error: null, success: true };
}
