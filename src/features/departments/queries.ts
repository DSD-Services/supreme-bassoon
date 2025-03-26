"use server";

import { createClient } from "@/utils/supabase/server";

export async function findAllDepartments() {
  const supabase = await createClient();

  return await supabase
    .from("departments")
    .select("*")
    .order("name", { ascending: true });
}

export async function findOneDepartment(departmentId: string | number) {
  const supabase = await createClient();

  return await supabase
    .from("departments")
    .select("*")
    .eq("id", +departmentId)
    .single();
}
