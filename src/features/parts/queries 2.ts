"use server";

import { createClient } from "@/utils/supabase/server";
import { authorize } from "../auth/queries";

export async function findAllParts() {
  authorize();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("parts")
    .select("*")
    .order("id", { ascending: true });

  return { data, error };
}

export async function findOnePart(partId: string | number) {
  authorize();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("parts")
    .select("*")
    .eq("id", +partId)
    .single();

  return { data, error };
}
