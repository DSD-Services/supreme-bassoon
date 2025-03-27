"use client";

import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faClock,
  faCheckCircle,
  faTimesCircle,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";
import SmallLabel from "@/components/dashboard/small-label";
import WorkOrderGroup from "@/components/dashboard/work-order-group";
import { HydratedWorkOrder } from "@/utils/supabase/types";
import ServicePartsTable from "./service-parts-table";
import { WorkOrderActionButtons } from "./work-order-action-buttons";
import { AnimatePresence, motion } from "framer-motion";
import { UpdateApptNotesDialog } from "./update-appt-notes-dialog";
import Tooltip from "@/components/ui/tooltip";

interface WorkOrderCardProps {
  workOrder: HydratedWorkOrder;
  userRole: string | null;
}

const statusIcons = {
  PENDING: { icon: faClock, color: "text-blue-500" },
  IN_PROGRESS: { icon: faClock, color: "text-yellow-500" },
  COMPLETED: { icon: faCheckCircle, color: "text-green-500" },
  CANCELLED: { icon: faTimesCircle, color: "text-red-500" },
};

export default function WorkOrderCard({
  workOrder,
  userRole,
}: WorkOrderCardProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [formattedDate, setFormattedDate] = useState({
    date: "",
    startTime: "",
    endTime: "",
  });

  const formatDateTime = (dateTime: string | null) => {
    if (!dateTime) return { date: "", startTime: "", endTime: "" };

    const dt = DateTime.fromISO(dateTime, { zone: "utc" }).setZone(
      "America/Denver",
    );

    return {
      date: dt.toFormat("MM/dd/yy"),
      startTime: dt.toFormat("h:mm a"),
      endTime: dt.plus({ hours: 1 }).toFormat("h:mm a"),
    };
  };

  useEffect(() => {
    if (workOrder.appointment_start) {
      const { date, startTime, endTime } = formatDateTime(
        workOrder.appointment_start,
      );

      setFormattedDate({ date, startTime, endTime });
    }
  }, [workOrder.appointment_start]);

  if (!userRole) {
    return (
      <div className="m-10">
        <h2 className="text-center text-2xl font-semibold">
          Oops, there was a problem getting the data. Please try again later.
        </h2>
      </div>
    );
  }

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

  const hasMissingParts =
    Array.isArray(workOrder.missing_parts) &&
    workOrder.missing_parts.length > 0;

  return (
    <div className="bg-background w-full max-w-[1050px] gap-2 rounded-md p-4 shadow-lg sm:pr-10 md:pr-4">
      <div className="flex flex-row justify-between">
        <div className="flex w-full flex-col md:flex-row">
          <div className="mr-4 flex md:mr-0">
            <div className="mr-2 w-1/2 md:mr-4 md:w-1/3 md:min-w-[150px] lg:mr-10 lg:w-1/2 lg:min-w-[220px]">
              <WorkOrderGroup labelText="Date &amp; Time">
                {formattedDate.date ? (
                  <>
                    <span>{formattedDate.date}</span>
                    <span className="hidden lg:inline">,</span>{" "}
                    <span className="block lg:inline">
                      {formattedDate.startTime} - {formattedDate.endTime}
                    </span>
                  </>
                ) : null}
              </WorkOrderGroup>
            </div>
            <div className="w-1/2 flex-grow md:mr-2 md:w-1/3 md:min-w-[220px] lg:mr-10 lg:w-1/2 lg:min-w-[290px]">
              <WorkOrderGroup labelText="Service Dept. &amp; Type">
                <span>{workOrder.department.name}:</span>{" "}
                <span className="block lg:inline">
                  {workOrder.service_type.name}
                </span>
              </WorkOrderGroup>
            </div>
          </div>
          <div className="mt-3 mr-4 flex flex-grow flex-row md:mt-0 md:mr-4 md:flex-wrap lg:flex-row">
            <div className="mr-1 w-1/2 md:mr-4 md:mb-3 md:w-full md:max-w-[100px] lg:mr-16">
              <WorkOrderGroup labelText="Technician">
                <div className="flex items-center">
                  <span>
                    {workOrder.technician.first_name}{" "}
                    {workOrder.technician.last_name.slice(0, 1)}.
                  </span>
                </div>
              </WorkOrderGroup>
            </div>
            <div className="flex w-1/2 sm:w-1/3 md:w-1/2">
              <WorkOrderGroup labelText="Status">
                {" "}
                {workOrder.status.toLocaleUpperCase()}
              </WorkOrderGroup>
              <span
                className={`pt-2 pl-2 text-lg font-medium text-blue-500 md:pt-3 ${
                  statusIcons[workOrder.status].color
                }`}
              >
                <FontAwesomeIcon icon={statusIcons[workOrder.status].icon} />
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          {(userRole === "ADMIN" || userRole === "TECHNICIAN") &&
            hasMissingParts && (
              <Tooltip infoText="Missing parts">
                <FontAwesomeIcon
                  icon={faWrench}
                  className="tooltip-item mr-4 text-lg text-blue-900"
                />
              </Tooltip>
            )}
          <span
            className="ml-auto cursor-pointer pr-2 text-right text-xl font-medium text-blue-500 sm:pl-4"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <motion.span
              initial={false}
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{ display: "inline-block" }}
            >
              <FontAwesomeIcon icon={faAngleDown} />
            </motion.span>
          </span>
        </div>
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="w-full gap-3 overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="mr-10">
              <div className="flex flex-col md:flex-row">
                <div className="mt-3 mr-0 flex flex-grow flex-col md:mt-4 md:mr-10">
                  <WorkOrderGroup labelText="Service Address">
                    <span className="text-xs font-semibold md:text-sm">
                      {workOrder.service_address?.address_line1}
                      {workOrder.service_address?.address_line2}
                      <span className="block">
                        {workOrder.service_address?.city},{" "}
                        {workOrder.service_address?.state}{" "}
                        {workOrder.service_address?.postal_code}
                      </span>
                    </span>
                  </WorkOrderGroup>
                </div>
                <div className="mt-3 flex-grow flex-col md:mt-4">
                  <div className="flex">
                    <div className="mr-4 w-1/2">
                      <WorkOrderGroup
                        labelText={
                          userRole === "CLIENT"
                            ? "Primary Phone"
                            : "Client Primary Phone"
                        }
                      >
                        {workOrder.client.primary_phone}
                      </WorkOrderGroup>
                    </div>
                    {workOrder.client.secondary_phone && (
                      <div className="w-1/2">
                        <WorkOrderGroup
                          labelText={
                            userRole === "CLIENT"
                              ? "Secondary Phone"
                              : "Client Secondary Phone"
                          }
                        >
                          {workOrder.client.secondary_phone}
                        </WorkOrderGroup>
                      </div>
                    )}
                  </div>
                  <div className="mt-3">
                    <WorkOrderGroup
                      labelText={
                        userRole === "CLIENT" ? "Email" : "Client Email"
                      }
                    >
                      {workOrder.client.email}
                    </WorkOrderGroup>
                  </div>
                </div>
              </div>
            </div>
            {workOrder.job_details && (
              <div className="mt-2 h-full w-full md:mt-4">
                <div className="flex justify-center">
                  <div className="flex w-full justify-between rounded-md bg-gray-100 p-2">
                    <div className="flex flex-col">
                      <div className="flex">
                        <SmallLabel>Job details:</SmallLabel>
                      </div>
                      <p className="pt-1 text-xs md:text-sm">
                        {workOrder.job_details}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {userRole === "CLIENT" && workOrder.appointment_notes && (
              <div className="mt-2 h-full w-full md:mt-4">
                <div className="flex justify-center">
                  <div className="flex w-full justify-between rounded-md bg-gray-100 p-2">
                    <div className="flex flex-col">
                      <SmallLabel>Appointment notes:</SmallLabel>
                      <p className="pt-1 text-xs md:text-sm">
                        {workOrder.appointment_notes}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {(userRole === "TECHNICIAN" || userRole === "ADMIN") && (
              <div className="mt-2 h-full w-full md:mt-4">
                <div className="flex justify-center">
                  <div className="flex w-full justify-between rounded-md bg-gray-100 p-2">
                    <div className="flex flex-col">
                      <div className="flex">
                        <SmallLabel>Appointment notes:</SmallLabel>
                        <span className="pl-2 text-slate-700 italic">
                          (Appointment notes are visible to the client)
                        </span>
                      </div>
                      <p className="pt-1 text-xs md:text-sm">
                        {workOrder.appointment_notes}
                      </p>
                    </div>
                    <UpdateApptNotesDialog workOrder={workOrder} />
                  </div>
                </div>
              </div>
            )}
            {(userRole === "TECHNICIAN" || userRole === "ADMIN") && (
              <div className="mt-3 w-full md:mt-4">
                {hasMissingParts && (
                  <span className="block pl-2 text-sm font-semibold text-red-500 italic">
                    <FontAwesomeIcon icon={faWrench} className="pr-2" />
                    This order has missing parts:
                  </span>
                )}
                <div className="flex justify-center">
                  <ServicePartsTable data={aggregatedParts} />
                </div>
              </div>
            )}
            <div className="col-span-6 mt-3">
              <WorkOrderActionButtons
                workOrderId={workOrder.id}
                currentWorkOrderStatus={workOrder.status}
                userRole={userRole}
                aptStart={workOrder.appointment_start!}
                clientEmail={workOrder.client.email}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
