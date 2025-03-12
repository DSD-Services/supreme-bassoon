import { createClient } from "@/utils/supabase/server";
import { authorize } from "@/features/auth/queries";

export async function findAllWorkOrders() {
  await authorize();
  const supabase = await createClient();

  const { data, error } = await supabase.from("work_orders").select("*");

  return { data, error };
}

export async function findAllWorkOrdersHydrated() {
  await authorize();
  const supabase = await createClient();

  const { data, error } = await supabase.from("work_orders").select(
    `
      *,
      client:profiles!client_id (*),
      technician:profiles!technician_id (*),
      department:departments!department_id (*),
      service_type:service_types!service_type_id (*),
      reserved_parts (*, part:part_id (*)),
      service_type_parts:service_type_id!inner (
        service_type_parts (*, part:part_id (*))
      )
    `,
  );

  if (error) {
    throw new Error(error.message);
  }

  return { data };
}

export async function findOneWorkOrders(workOrderId: number) {
  await authorize();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("work_orders")
    .select("*")
    .eq("id", workOrderId)
    .single();

  return { data, error };
}
