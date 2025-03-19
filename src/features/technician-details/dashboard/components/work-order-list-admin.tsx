"use client";

import { useState } from "react";
import { Select } from "@/components/ui/select";
import { HydratedWorkOrder } from "@/utils/supabase/types";
import WorkOrderCard from "./work-order-card";
import PaginationWrapper from "./pagination-wrapper";

interface WorkOrdersGroupedByTechnician {
  [technicianId: string]: {
    technicianName: string;
    workOrders: HydratedWorkOrder[];
  };
}

interface WorkOrderListAdminProps {
  workOrdersGroupedByTechnician: WorkOrdersGroupedByTechnician;
  userRole: "CLIENT" | "TECHNICIAN" | "ADMIN" | null;
  todayAppointments: HydratedWorkOrder[];
  hasMissingParts: boolean;
}

export default function WorkOrderListAdmin({
  workOrdersGroupedByTechnician,
  userRole,
  todayAppointments,
  hasMissingParts,
}: WorkOrderListAdminProps) {
  const [selectedTechnician, setSelectedTechnician] = useState("ALL");

  const technicianOptions = Object.keys(workOrdersGroupedByTechnician).map(
    (technicianId) => {
      const technicianName =
        workOrdersGroupedByTechnician[technicianId].technicianName;
      return {
        id: technicianId,
        name: technicianName,
      };
    },
  );

  function handleTechnicianChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedTechnician(event.target.value);
  }

  const filteredWorkOrders =
    selectedTechnician === "ALL"
      ? (() => {
          const allWorkOrders: HydratedWorkOrder[] = [];
          Object.values(workOrdersGroupedByTechnician).forEach((technician) => {
            allWorkOrders.push(...technician.workOrders);
          });
          return allWorkOrders;
        })()
      : workOrdersGroupedByTechnician[selectedTechnician]?.workOrders || [];

  console.log("Selected Technician:", selectedTechnician);
  console.log("Filtered work orders:", filteredWorkOrders);

  return (
    <>
      {userRole === "ADMIN" && (
        <>
          <h3 className="text-lg font-bold text-blue-800">
            Today&apos;s Work Orders:
          </h3>
          {todayAppointments.length > 0 ? (
            todayAppointments.map((workOrder) => (
              <>
                <WorkOrderCard
                  key={workOrder.id}
                  workOrder={workOrder}
                  userRole={userRole}
                  hasMissingParts={hasMissingParts}
                />
              </>
            ))
          ) : (
            <div>
              <span className="text-center text-base text-slate-700 lg:text-lg">
                No work orders are scheduled today.
              </span>
            </div>
          )}
          <h3 className="mt-6 text-lg font-bold text-blue-800">
            Upcoming Work Orders:
          </h3>
          <label className="text-base text-slate-700 italic">
            Filter Work Orders by Technician:
          </label>
          <Select
            onChange={handleTechnicianChange}
            value={selectedTechnician}
            className="w-1/2 rounded-lg border-r-10 border-transparent bg-blue-500 px-3 py-2 text-sm text-white shadow-lg hover:cursor-pointer md:text-base"
          >
            <option value="ALL">All Technicians</option>
            {technicianOptions.map((technician) => (
              <option key={technician.id} value={technician.id}>
                {technician.name}
              </option>
            ))}
          </Select>

          <PaginationWrapper
            appointments={filteredWorkOrders}
            userRole={userRole}
          />
        </>
      )}
    </>
  );
}
