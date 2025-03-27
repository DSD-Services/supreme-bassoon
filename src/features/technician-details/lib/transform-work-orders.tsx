import { DateTime } from "luxon";
import { CalendarWorkOrder, ServiceAddress, SpecialWorkOrder } from "../types";

function parseServiceAddress(service_address: unknown): ServiceAddress | null {
  if (typeof service_address === "string") {
    try {
      return JSON.parse(service_address) as ServiceAddress;
    } catch (error) {
      console.error("Failed to parse service address:", error);
      return null;
    }
  } else if (typeof service_address === "object" && service_address !== null) {
    return service_address as ServiceAddress;
  }
  return null;
}

export default function TransformWorkOrders(
  workOrders: SpecialWorkOrder[],
): CalendarWorkOrder[] {
  return workOrders.map((order) => {
    const serviceAddress = parseServiceAddress(order.service_address);

    return {
      id: order.id,
      title: order.service_type_name,
      start: order.appointment_start
        ? DateTime.fromISO(order.appointment_start, { zone: "utc" })
            .setZone("America/Denver")
            .toISO() || ""
        : "",
      end: order.appointment_end
        ? DateTime.fromISO(order.appointment_end, { zone: "utc" })
            .setZone("America/Denver")
            .toISO() || ""
        : "",
      extendedProps: {
        department: order.department_name,
        serviceType: order.service_type_name,
        status: order.status ?? "Unknown",
        clientName: order.client_name ?? "Unknown",
        jobDetails: order.job_details ?? "",
        serviceAddress: serviceAddress
          ? {
              addressLine1: serviceAddress.address_line1 ?? null,
              addressLine2: serviceAddress.address_line2 ?? null,
              city: serviceAddress.city ?? null,
              state: serviceAddress.state ?? null,
              postalCode: serviceAddress.postal_code ?? null,
            }
          : {
              addressLine1: null,
              addressLine2: null,
              city: null,
              state: null,
              postalCode: null,
            },
        primaryPhone: order.primary_phone || "N/A",
        secondaryPhone: order.secondary_phone || undefined,
      },
    };
  });
}
