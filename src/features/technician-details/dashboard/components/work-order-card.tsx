"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faClock,
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import SmallLabel from "@/components/dashboard/small-label";
import ExpandedWorkOrder from "./expanded-work-order";
import WorkOrderGroup from "@/components/dashboard/work-order-group";
import type { HydratedWorkOrder } from "@/utils/supabase/types";
import { formatDateTime } from "@/lib/utils";

interface WorkOrderCardProps {
  workOrder: HydratedWorkOrder;
}

const statusIcons = {
  PENDING: { icon: faClock, color: "text-blue-500" },
  IN_PROGRESS: { icon: faClock, color: "text-yellow-500" },
  COMPLETED: { icon: faCheckCircle, color: "text-green-500" },
  CANCELLED: { icon: faTimesCircle, color: "text-red-500" },
};

export default function WorkOrderCard({ workOrder }: WorkOrderCardProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const aggregatedParts: {
    [key: number]: {
      name: string;
      qtyNeed: number;
      qtyReserved: number;
    };
  } = {};

  workOrder.service_type_parts.service_type_parts.forEach((servicePart) => {
    const partId = servicePart.part_id;
    const partName = servicePart.part.name;
    const qtyNeed = servicePart.quantity;

    if (!aggregatedParts[partId]) {
      aggregatedParts[partId] = {
        name: partName,
        qtyNeed: qtyNeed,
        qtyReserved: 0,
      };
    } else {
      aggregatedParts[partId].qtyNeed += qtyNeed;
    }
  });

  workOrder.reserved_parts.forEach((reservedPart) => {
    const partId = reservedPart.part_id;
    const qtyStock = reservedPart.quantity;

    if (aggregatedParts[partId]) {
      aggregatedParts[partId].qtyReserved = qtyStock;
    }
  });

  const isMissingParts = Object.values(aggregatedParts).some(
    (part) => part.qtyReserved < part.qtyNeed,
  );

  return (
    <div className="bg-background m-1 mb-2 grid w-full grid-cols-6 gap-3 rounded-md p-2 shadow-lg md:w-2/3 lg:w-1/2">
      <div className="col-span-1">
        <WorkOrderGroup labelText="Time">
          {workOrder.appointment_start
            ? formatDateTime(workOrder.appointment_start)
            : null}{" "}
          -{" "}
          {workOrder.appointment_end
            ? formatDateTime(workOrder.appointment_end)
            : null}
        </WorkOrderGroup>
      </div>
      <div className="col-span-3">
        <WorkOrderGroup labelText="Service Type">
          {workOrder.service_type.name}
        </WorkOrderGroup>
      </div>
      <div className="col-span-1">
        <WorkOrderGroup labelText="Job #">{workOrder.id}</WorkOrderGroup>
      </div>
      <div className="col-span-1">
        <div className="flex flex-col">
          <span
            className="pr-2 text-right text-xl font-medium text-blue-500"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <FontAwesomeIcon icon={faAngleUp} />
            ) : (
              <FontAwesomeIcon icon={faAngleDown} />
            )}
          </span>
        </div>
      </div>
      <div className="col-span-4">
        <WorkOrderGroup labelText="Client Name">
          {workOrder.client.first_name} {workOrder.client.last_name}
        </WorkOrderGroup>
      </div>
      <div className="col-span-2">
        <WorkOrderGroup labelText="Missing Parts?">
          {isMissingParts ? "Yes" : "No"}
        </WorkOrderGroup>
      </div>
      <div className="col-span-4">
        <div className="flex flex-col">
          <SmallLabel>Client Address</SmallLabel>
          <span className="text-xs font-semibold md:text-sm">
            {workOrder.client.address_line1}, {workOrder.client.address_line2},{" "}
            {workOrder.client.city}, {workOrder.client.state}{" "}
            {workOrder.client.postal_code}
          </span>
        </div>
      </div>
      <div className="col-span-2">
        <div className="flex">
          <div className="flex flex-col">
            <SmallLabel>Status</SmallLabel>
            <div className="flex items-center">
              <span
                className={`self-end pr-1 text-lg font-medium text-blue-500 ${
                  statusIcons[workOrder.status].color
                }`}
              >
                <FontAwesomeIcon icon={statusIcons[workOrder.status].icon} />
              </span>
              <span className="text-xs font-semibold md:text-sm">
                {workOrder.status.toLocaleUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>
      {isExpanded && (
        <ExpandedWorkOrder
          workOrder={workOrder}
          aggregatedParts={aggregatedParts}
        />
      )}
    </div>
  );
}
