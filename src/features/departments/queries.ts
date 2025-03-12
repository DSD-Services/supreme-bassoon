"use server";

import { createClient } from "@/utils/supabase/server";
import { authorize } from "../auth/queries";

export async function findAllDepartments() {
  authorize();
  const supabase = await createClient();
  const { data, error } = await supabase.from("departments").select("*");
  return { data, error };
}

export async function findOneDepartment(departmentId: string | number) {
  authorize();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("departments")
    .select("*")
    .eq("id", +departmentId)
    .single();

  return { data, error };
}
