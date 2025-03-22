import { createClient } from "@/utils/supabase/server";
import { reqRoles } from "@/features/auth/queries";
import { HydratedWorkOrder } from "@/utils/supabase/types";

export async function findAllWorkOrders() {
  const supabase = await createClient();
  return await supabase.from("work_orders").select("*");
}

export async function findAllWorkOrdersHydrated(): Promise<{
  data: HydratedWorkOrder[];
}> {
  const profile = await reqRoles(["CLIENT", "TECHNICIAN", "ADMIN"]);
  if (!profile) throw new Error("Unauthorized");

  const supabase = await createClient();

  let query = supabase.from("work_orders").select(
    `
      *,
      client:profiles!client_id (*),
      technician:profiles!technician_id (*),
      department:departments!department_id (*),
      service_type:service_types!service_type_id (*),
      reserved_parts (*, part:part_id (*)),
      missing_parts (*, part:part_id (*)),
      service_type_parts:service_type_id!inner (
        service_type_parts (*, part:part_id (*))
      )
    `,
  );

  if (profile.role === "CLIENT") {
    query = query.eq("client_id", profile.id);
  } else if (profile.role === "TECHNICIAN") {
    query = query.eq("technician_id", profile.id);
  }

  const { data, error } = await query.overrideTypes<Array<HydratedWorkOrder>>();

  if (error) {
    throw new Error(error.message);
  }

  return { data };
}

export async function findOneWorkOrders(workOrderId: number) {
  const supabase = await createClient();

  return await supabase
    .from("work_orders")
    .select("*")
    .eq("id", workOrderId)
    .single();
}
