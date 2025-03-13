"use server";

import { createClient } from "@/utils/supabase/server";
import { protect } from "../auth/queries";

export async function findAllDepartments() {
  protect();
  const supabase = await createClient();

  return await supabase
    .from("departments")
    .select("*")
    .order("id", { ascending: true });
}

export async function findOneDepartment(departmentId: string | number) {
  protect();
  const supabase = await createClient();

  return await supabase
    .from("departments")
    .select("*")
    .eq("id", +departmentId)
    .single();
}
