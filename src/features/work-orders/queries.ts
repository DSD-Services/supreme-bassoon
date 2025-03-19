import { createClient } from "@/utils/supabase/server";
import { protect } from "@/features/auth/queries";
import { HydratedWorkOrder } from "@/utils/supabase/types";

export async function findAllWorkOrders() {
  await protect();
  const supabase = await createClient();

  const { data, error } = await supabase.from("work_orders").select("*");

  return { data, error };
}

export async function findAllWorkOrdersHydrated(): Promise<{
  data: HydratedWorkOrder[];
}> {
  await protect();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("work_orders")
    .select(
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
    )
    .overrideTypes<Array<HydratedWorkOrder>>();

  if (error) {
    throw new Error(error.message);
  }

  return { data };
}

export async function findOneWorkOrders(workOrderId: number) {
  await protect();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("work_orders")
    .select("*")
    .eq("id", workOrderId)
    .single();

  return { data, error };
}

export async function hasMissingPartsForWorkOrder(
  workOrderId: number,
): Promise<boolean> {
  await protect();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("missing_parts")
    .select("id")
    .eq("work_order_id", workOrderId);

  if (error) {
    throw new Error(error.message);
  }

  return data && data.length > 0;
}
