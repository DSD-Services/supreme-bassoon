"use client";

import { useState } from "react";
import WorkOrderCard from "./work-order-card";
import { HydratedWorkOrder } from "@/utils/supabase/types";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";

const ITEMS_PER_PAGE = 5;

export default function PaginationWrapper({
  appointments,
  userRole,
}: {
  appointments: HydratedWorkOrder[];
  userRole: "CLIENT" | "TECHNICIAN" | "ADMIN" | null;
}) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(appointments.length / ITEMS_PER_PAGE);

  const paginatedAppointments = appointments.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <>
      {appointments.length > 0 ? (
        <>
          {paginatedAppointments.map((workOrder) => (
            <WorkOrderCard
              key={workOrder.id}
              workOrder={workOrder}
              userRole={userRole}
            />
          ))}
          <div className="mt-4 flex items-center justify-center gap-4">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="disabled:opacity-50"
            >
              <FontAwesomeIcon icon={faAnglesLeft} />
            </Button>
            <span className="text-blue-800">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="disabled:opacity-50"
            >
              <FontAwesomeIcon icon={faAnglesRight} />
            </Button>
          </div>
        </>
      ) : null}
    </>
  );
}
