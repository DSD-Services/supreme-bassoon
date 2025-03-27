"use server";

import { createClient } from "@/utils/supabase/server";

type FindAllPartsOptions = { query?: string };
export async function findAllParts(options: FindAllPartsOptions = {}) {
  const supabase = await createClient();

  const query = supabase.from("parts").select("*");

  if (options.query) {
    query.ilike("name", `%${options.query}%`);
  }

  return query.order("name", { ascending: true });
}

export async function findOnePart(partId: string | number) {
  const supabase = await createClient();

  return await supabase.from("parts").select("*").eq("id", +partId).single();
}
