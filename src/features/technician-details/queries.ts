import { createClient } from "@/utils/supabase/server";
import { TransformBusinessHours } from "./lib/transform-business-hours";
import { BusinessHours, TechnicianSchedule } from "./types";

export async function findAllTechnicianDetails() {
  const supabase = await createClient();

  return await supabase.from("technician_details").select("*, departments(*)");
}

export async function findOneTechnicianDetails(userId: string) {
  const supabase = await createClient();

  return await supabase
    .from("technician_details")
    .select("*, departments(*)")
    .eq("id", userId)
    .single();
}

export async function findTechnicianSchedule(
  userId: string,
): Promise<{ data: TechnicianSchedule | null; error: string | null }> {
  const supabase = await createClient();

  const { data: technicianDetails, error: technicianDetailsError } =
    await supabase
      .from("technician_details")
      .select("*")
      .eq("id", userId)
      .single();

  if (technicianDetailsError) {
    console.error(
      "[findTechnicianDetailsError]:",
      technicianDetailsError.message,
    );
    return { data: null, error: "Failed to fetch technician details" };
  }

  if (!technicianDetails) {
    return { data: null, error: "Technician details not found" };
  }

  const { data: workOrders, error: workOrderError } = await supabase
    .from("work_orders")
    .select(
      "id, appointment_start, appointment_end, department_id, job_details, service_type_id, service_address, client_id, primary_phone, secondary_phone, status",
    )
    .eq("technician_id", userId);

  if (workOrderError) {
    console.error("[fetchWorkOrdersError]:", workOrderError.message);
    return { data: null, error: "Failed to fetch work orders" };
  }

  if (!workOrders || workOrders.length === 0) {
    return { data: null, error: "Work orders not found" };
  }

  const departmentIds = [
    ...new Set(workOrders.map((order) => order.department_id)),
  ];
  const serviceTypeIds = [
    ...new Set(workOrders.map((order) => order.service_type_id)),
  ];

  const { data: departments, error: departmentError } = await supabase
    .from("departments")
    .select("id, name")
    .in("id", departmentIds);

  if (departmentError) {
    console.error("[fetchDepartmentsError]:", departmentError.message);
    return { data: null, error: "Failed to fetch departments" };
  }

  const { data: serviceTypes, error: serviceTypeError } = await supabase
    .from("service_types")
    .select("id, name")
    .in("id", serviceTypeIds);

  if (serviceTypeError) {
    console.error("[fetchServiceTypesError]:", serviceTypeError.message);
    return { data: null, error: "Failed to fetch service types" };
  }

  const clientIds = [...new Set(workOrders.map((order) => order.client_id))];
  const { data: clients, error: clientError } = await supabase
    .from("profiles")
    .select("id, first_name, last_name")
    .in("id", clientIds);

  if (clientError) {
    console.error("[fetchClientsError]:", clientError.message);
    return { data: null, error: "Failed to fetch client names" };
  }

  const departmentMap = Object.fromEntries(
    departments.map((dep) => [dep.id, dep.name]),
  );
  const serviceTypeMap = Object.fromEntries(
    serviceTypes.map((type) => [type.id, type.name]),
  );
  const clientMap = Object.fromEntries(
    clients.map((client) => [
      client.id,
      `${client.first_name} ${client.last_name}`,
    ]),
  );

  const transformedWorkOrders = workOrders.map((order) => ({
    ...order,
    department_name: departmentMap[order.department_id] || "Unknown",
    service_type_name: serviceTypeMap[order.service_type_id] || "Unknown",
    client_name: clientMap[order.client_id] || "Unknown",
  }));

  return {
    data: {
      technicianDetails,
      workOrders: transformedWorkOrders,
    },
    error: null,
  };
}

export async function getTechnicianBusinessHours(
  userId: string,
): Promise<BusinessHours | null> {
  const { data, error } = await findTechnicianSchedule(userId);
  if (error || !data) return null;

  return TransformBusinessHours(data.technicianDetails);
}
