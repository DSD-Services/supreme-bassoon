import {
  findAllWorkOrdersHydrated,
  hasMissingPartsForWorkOrder,
} from "@/features/work-orders/queries";
import WorkOrderCard from "@/features/technician-details/dashboard/components/work-order-card";
import { getUserRole } from "@/features/auth/queries";
import { DateTime } from "luxon";
import { HydratedWorkOrder } from "@/utils/supabase/types";
import PaginationWrapper from "./pagination-wrapper";
import WorkOrderListAdmin from "./work-order-list-admin";

export default async function WorkOrderList() {
  const { data: workOrders } = await findAllWorkOrdersHydrated();
  const userRole = await getUserRole();

  const workOrdersWithMissingParts = await Promise.all(
    workOrders.map(async (workOrder) => {
      const hasMissingParts = await hasMissingPartsForWorkOrder(workOrder.id);
      return { ...workOrder, hasMissingParts } as HydratedWorkOrder & {
        hasMissingParts: boolean;
      };
    }),
  );

  const today = DateTime.local().startOf("day");
  const endOfDay = today.endOf("day");
  const upcomingStart = today.plus({ days: 1 });
  const upcomingEnd = DateTime.local().plus({ months: 1 });

  const sortByAppointment = (a: HydratedWorkOrder, b: HydratedWorkOrder) => {
    const startA = DateTime.fromISO(a.appointment_start || "");
    const startB = DateTime.fromISO(b.appointment_start || "");
    return startA < startB ? -1 : startA > startB ? 1 : 0;
  };

  const todayAppointments = workOrdersWithMissingParts
    ? workOrdersWithMissingParts
        .filter((workOrder) => {
          if (!workOrder.appointment_start) return false;
          if (workOrder.appointment_start) {
            const appointmentStart = DateTime.fromISO(
              workOrder.appointment_start,
            );
            return appointmentStart >= today && appointmentStart <= endOfDay;
          }
          return false;
        })
        .sort(sortByAppointment)
    : [];

  const upcomingAppointments = workOrdersWithMissingParts
    ? workOrdersWithMissingParts
        .filter((workOrder) => {
          if (!workOrder.appointment_start) return false;
          if (workOrder.appointment_start) {
            const appointmentStart = DateTime.fromISO(
              workOrder.appointment_start,
            );
            return (
              appointmentStart >= upcomingStart &&
              appointmentStart <= upcomingEnd
            );
          }
          return false;
        })
        .sort(sortByAppointment)
    : [];

  const pastAppointments = workOrders
    ? workOrders
        .filter((workOrder) => {
          if (!workOrder.appointment_start) return false;
          if (workOrder.appointment_start) {
            const appointmentStart = DateTime.fromISO(
              workOrder.appointment_start,
            );
            return appointmentStart < today;
          }
          return false;
        })
        .sort((a, b) => {
          const startA = DateTime.fromISO(a.appointment_start || "");
          const startB = DateTime.fromISO(b.appointment_start || "");
          return startB < startA ? -1 : startB > startA ? 1 : 0;
        })
    : [];

  const workOrdersGroupedByTechnician: Record<
    string,
    {
      technicianName: string;
      workOrders: (HydratedWorkOrder & { hasMissingParts: boolean })[];
    }
  > = {};

  if (userRole === "ADMIN" && workOrdersWithMissingParts.length) {
    workOrdersWithMissingParts.forEach((workOrder) => {
      if (!workOrder.technician) return;

      const technicianId = workOrder.technician.id;
      const technicianName = `${workOrder.technician.first_name} ${workOrder.technician.last_name}`;

      if (!workOrdersGroupedByTechnician[technicianId]) {
        workOrdersGroupedByTechnician[technicianId] = {
          technicianName,
          workOrders: [],
        };
      }

      workOrdersGroupedByTechnician[technicianId].workOrders.push(workOrder);
    });
  }

  Object.keys(workOrdersGroupedByTechnician).forEach((technicianId) => {
    const technician = workOrdersGroupedByTechnician[technicianId];
    technician.workOrders.sort((a, b) => {
      const startA = DateTime.fromISO(a.appointment_start || "");
      const startB = DateTime.fromISO(b.appointment_start || "");
      return startA < startB ? -1 : startA > startB ? 1 : 0;
    });
  });

  const hasMissingPartsForAny = Object.values(
    workOrdersGroupedByTechnician,
  ).some((technician) =>
    technician.workOrders.some((workOrder) => workOrder.hasMissingParts),
  );

  console.log("Past appointments:", pastAppointments);

  return (
    <div className="m-0 flex flex-col items-center gap-2 rounded-none bg-blue-50 p-2 text-xs md:m-2 md:mx-2 md:mb-3 md:gap-3 md:rounded-lg md:p-3 lg:mx-10 lg:mb-4 lg:p-4">
      {userRole === "ADMIN" && (
        <WorkOrderListAdmin
          todayAppointments={todayAppointments}
          workOrdersGroupedByTechnician={workOrdersGroupedByTechnician}
          userRole={userRole}
          hasMissingParts={hasMissingPartsForAny}
        />
      )}
      {(userRole === "TECHNICIAN" || userRole === "CLIENT") && (
        <>
          <h3 className="text-lg font-bold text-blue-800">
            Today&apos;s Appointments - {today.toLocaleString()}:
          </h3>
          {todayAppointments.length > 0 ? (
            todayAppointments.map((workOrder) => (
              <WorkOrderCard
                key={workOrder.id}
                workOrder={workOrder}
                userRole={userRole}
                hasMissingParts={workOrder.hasMissingParts ?? false}
              />
            ))
          ) : userRole === "TECHNICIAN" ? (
            <div>
              <span className="text-center text-base text-slate-700 lg:text-lg">
                You have no work orders scheduled today.
              </span>
            </div>
          ) : userRole === "CLIENT" ? (
            <div className="flex flex-col">
              <span className="text-center text-base text-slate-700 lg:text-lg">
                You don&apos;t have any upcoming appointments.
              </span>
              <span className="text-center text-base text-slate-700 lg:text-lg">
                Schedule a new appointment above!
              </span>
            </div>
          ) : (
            <div>
              <span className="text-center text-base text-slate-700 lg:text-lg">
                No work orders are scheduled today.
              </span>
            </div>
          )}
        </>
      )}
      {(userRole === "CLIENT" || userRole === "TECHNICIAN") && (
        <>
          {userRole === "CLIENT" ? (
            <h3 className="mt-6 text-lg font-bold text-blue-800">
              Upcoming Appointments:
            </h3>
          ) : (
            <h3 className="mt-6 text-lg font-bold text-blue-800">
              Upcoming Work Orders:
            </h3>
          )}
          <PaginationWrapper
            userRole={userRole}
            appointments={upcomingAppointments}
          />
        </>
      )}
      {userRole === "CLIENT" && pastAppointments.length > 0 && (
        <>
          <h3 className="mt-6 text-lg font-bold text-blue-800">
            Past Appointments:
          </h3>
          <span className="-mt-2 text-slate-700 italic">
            (Sorted by most recent first)
          </span>
          <PaginationWrapper
            userRole={userRole}
            appointments={pastAppointments}
          />
        </>
      )}
    </div>
  );
}
