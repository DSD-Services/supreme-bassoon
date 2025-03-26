"use server";

import { reqRoles } from "@/features/auth/queries";
import { createClient } from "@/utils/supabase/server";

export async function updateServiceTypeDepartmentAction(
  serviceTypeId: number,
  departmentId: number,
) {
  const profile = await reqRoles(["ADMIN"]);
  if (!profile) throw new Error("Forbidden");

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("department_service_types")
    .upsert(
      {
        service_type_id: serviceTypeId,
        department_id: departmentId,
      },
      { onConflict: "service_type_id" },
    );

  return { data, error, success: error ? false : true };
}
