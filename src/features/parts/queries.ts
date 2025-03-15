"use server";

import { createClient } from "@/utils/supabase/server";
import { protect } from "../auth/queries";

export async function findAllParts() {
  protect();
  const supabase = await createClient();

  return await supabase
    .from("parts")
    .select("*")
    .order("id", { ascending: true });
}

export async function findOnePart(partId: string | number) {
  protect();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("parts")
    .select("*")
    .eq("id", +partId)
    .single();

  return { data, error };
}
