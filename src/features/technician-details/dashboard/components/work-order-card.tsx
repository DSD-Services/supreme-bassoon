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
import { WorkOrderData } from "@/features/technician/dashboard/types/work-order.types";

interface WorkOrderCardProps {
  data: WorkOrderData;
}

const statusIcons = {
  pending: { icon: faClock, color: "text-blue-500" },
  complete: { icon: faCheckCircle, color: "text-green-500" },
  cancelled: { icon: faTimesCircle, color: "text-red-500" },
};

export default function WorkOrderCard({ data }: WorkOrderCardProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div className="bg-background m-1 mb-2 grid w-full grid-cols-6 gap-3 rounded-md p-2 shadow-lg md:w-2/3 lg:w-1/2">
      <div className="col-span-1">
        <WorkOrderGroup labelText="Time">{data.time}</WorkOrderGroup>
      </div>
      <div className="col-span-3">
        <WorkOrderGroup labelText="Service Type">
          {data.serviceType}
        </WorkOrderGroup>
      </div>
      <div className="col-span-1">
        <WorkOrderGroup labelText="Job #">{data.jobNumber}</WorkOrderGroup>
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
          {data.clientFirstName} {data.clientLastName}
        </WorkOrderGroup>
      </div>
      <div className="col-span-2">
        <WorkOrderGroup labelText="Missing Parts?">
          {data.missingParts ? "Yes" : "No"}
        </WorkOrderGroup>
      </div>
      <div className="col-span-4">
        <div className="flex flex-col">
          <SmallLabel>Client Address</SmallLabel>
          <span className="text-xs font-semibold md:text-sm">
            {data.clientStreetAddress}, {data.clientCity}, {data.clientState}{" "}
            {data.clientPostalCode}
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
                  statusIcons[data.workOrderStatus].color
                }`}
              >
                <FontAwesomeIcon
                  icon={statusIcons[data.workOrderStatus].icon}
                />
              </span>
              <span className="text-xs font-semibold md:text-sm">
                {data.workOrderStatus.toLocaleUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>
      {isExpanded && <ExpandedWorkOrder data={data} />}
    </div>
  );
}
