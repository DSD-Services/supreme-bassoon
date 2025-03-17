"use server";

import { reqRoles } from "@/features/auth/queries";
import { createClient } from "@/utils/supabase/server";

export async function updateServiceTypeDepartmentAction(
  serviceTypeId: number,
  departmentId: number,
) {
  await reqRoles(["ADMIN"]);

  const supabase = await createClient();

  await supabase
    .from("department_service_types")
    .delete()
    .eq("service_type_id", serviceTypeId);

  const { error } = await supabase.from("department_service_types").insert({
    service_type_id: serviceTypeId,
    department_id: departmentId,
  });

  return { success: error ? false : true };
}
