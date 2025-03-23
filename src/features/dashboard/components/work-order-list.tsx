import { findAllWorkOrdersHydrated } from "@/features/work-orders/queries";
import WorkOrderCard from "./work-order-card";
import { getUserRole } from "@/features/auth/queries";
import { DateTime } from "luxon";
import { HydratedWorkOrder } from "@/utils/supabase/types";
import PaginationWrapper from "./pagination-wrapper";
import WorkOrderListAdmin from "./work-order-list-admin";

export default async function WorkOrderList() {
  const { data: workOrders } = await findAllWorkOrdersHydrated();
  const userRole = await getUserRole();

  const today = DateTime.local().setZone("America/Denver").startOf("day");
  const endOfDay = today.endOf("day");
  const upcomingStart = today.plus({ days: 1 });
  const upcomingEnd = today.plus({ months: 1 });

  const sortByAppointment = (a: HydratedWorkOrder, b: HydratedWorkOrder) => {
    const startA = DateTime.fromISO(a.appointment_start || "");
    const startB = DateTime.fromISO(b.appointment_start || "");
    return startA < startB ? -1 : startA > startB ? 1 : 0;
  };

  const todayAppointments = workOrders
    ? workOrders
        .filter((workOrder) => {
          if (!workOrder.appointment_start) return false;
          if (workOrder.appointment_start) {
            const appointmentStart = DateTime.fromISO(
              workOrder.appointment_start,
              {
                zone: "America/Denver",
              },
            );
            return appointmentStart >= today && appointmentStart <= endOfDay;
          }
          return false;
        })
        .sort(sortByAppointment)
    : [];

  const upcomingAppointments = workOrders
    ? workOrders
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
              {
                zone: "America/Denver",
              },
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
      workOrders: HydratedWorkOrder[];
    }
  > = {};

  if (userRole === "ADMIN" && workOrders.length) {
    workOrders.forEach((workOrder) => {
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
      const startA = DateTime.fromISO(a.appointment_start || "").setZone(
        "America/Denver",
      );
      const startB = DateTime.fromISO(b.appointment_start || "").setZone(
        "America/Denver",
      );
      return startA < startB ? -1 : startA > startB ? 1 : 0;
    });
  });

  return (
    <div className="m-0 flex flex-col items-center gap-2 rounded-none bg-blue-50 p-3 text-xs sm:gap-3 md:rounded-lg">
      {userRole === "ADMIN" && (
        <WorkOrderListAdmin
          todayAppointments={todayAppointments}
          workOrdersGroupedByTechnician={workOrdersGroupedByTechnician}
          userRole={userRole}
        />
      )}
      {userRole === "TECHNICIAN" && (
        <>
          <h3 className="text-lg font-bold text-blue-800">
            Today&apos;s Work Orders - {today.toFormat("MM/dd/yy")}
          </h3>
          {todayAppointments.length > 0 ? (
            todayAppointments.map((workOrder) => (
              <WorkOrderCard
                key={workOrder.id}
                workOrder={workOrder}
                userRole={userRole}
              />
            ))
          ) : (
            <div>
              <span className="text-center text-base text-slate-700 lg:text-lg">
                You have no work orders scheduled today.
              </span>
            </div>
          )}
        </>
      )}
      {userRole === "CLIENT" && todayAppointments?.length > 0 && (
        <>
          <h3 className="text-lg font-bold text-blue-800">
            Today&apos;s Appointments - {today.toLocaleString()}:
          </h3>
          {todayAppointments.map((appointment) => (
            <WorkOrderCard
              key={appointment.id}
              workOrder={appointment}
              userRole={userRole}
            />
          ))}
        </>
      )}
      {userRole === "CLIENT" && (
        <>
          <h3 className="mt-6 text-lg font-bold text-blue-800">
            Upcoming Appointments:
          </h3>
          {upcomingAppointments?.length > 0 ? (
            <PaginationWrapper
              userRole={userRole}
              appointments={upcomingAppointments}
            />
          ) : (
            <div className="flex flex-col">
              <span className="text-center text-base text-slate-700 lg:text-lg">
                You don&apos;t have any upcoming appointments.
              </span>
              <span className="text-center text-base text-slate-700 lg:text-lg">
                Schedule a new appointment above!
              </span>
            </div>
          )}
        </>
      )}
      {userRole === "TECHNICIAN" && (
        <>
          <h3 className="mt-6 text-lg font-bold text-blue-800">
            Upcoming Work Orders:
          </h3>
          {upcomingAppointments?.length > 0 ? (
            <PaginationWrapper
              userRole={userRole}
              appointments={upcomingAppointments}
            />
          ) : (
            <div>
              <span className="text-center text-base text-slate-700 lg:text-lg">
                You have no upcoming work orders.
              </span>
            </div>
          )}
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
