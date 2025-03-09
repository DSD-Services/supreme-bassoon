// TODO - update supabase data sending
import SmallLabel from "@/components/dashboard/small-label";
import ServicePartsTable from "./service-parts-table";
import { WorkOrderData } from "@/lib/types/work-order.types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons/faCircleCheck";
import WorkOrderGroup from "@/components/dashboard/work-order-group";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface ExpandedWorkOrderProps {
  data: WorkOrderData;
}

export default function ExpandedWorkOrder({ data }: ExpandedWorkOrderProps) {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const markOrderComplete = async () => {
    setIsUpdating(true);
    const { error } = await supabase
      .from("work_orders")
      .update({ workOrderStatus: "complete" })
      .eq("id", data.id);

    if (error) {
      console.error("Error updating work order status:", error);
    } else {
      console.log("Work order status updated successfully");
    }
    setIsUpdating(false);
  };

  return (
    <>
      <div className="col-span-2 lg:col-span-2">
        <WorkOrderGroup labelText="Client Primary Phone">
          {data.clientPrimaryPhone}
        </WorkOrderGroup>
      </div>
      <div className="col-span-4 lg:col-span-2">
        <WorkOrderGroup labelText="Client Secondary Phone">
          {data.clientSecondaryPhone}
        </WorkOrderGroup>
      </div>
      <div className="col-span-6">
        <WorkOrderGroup labelText="Client Email">
          {data.clientEmail}
        </WorkOrderGroup>
      </div>
      <div className="col-span-6">
        <div className="flex justify-center">
          <ServicePartsTable data={data} />
        </div>
      </div>
      <div className="col-span-6 mt-2">
        <div className="flex justify-center">
          <div className="bg-secondary/30 w-full rounded-md p-2">
            <SmallLabel>Appointment notes:</SmallLabel>
            <p className="pt-1 text-xs md:text-sm">{data.appointmentNotes}</p>
          </div>
        </div>
      </div>
      <div className="col-span-6 mt-2 pb-2">
        <div className="flex justify-center">
          <button
            className="bg-primary text-primary-foreground hover:bg-primary/80 flex w-36 cursor-pointer items-center gap-2 rounded-lg px-2 py-1 text-sm font-semibold shadow-lg transition hover:scale-105"
            onClick={markOrderComplete}
            disabled={isUpdating}
          >
            <FontAwesomeIcon icon={faCircleCheck} className="text-2xl" />
            {isUpdating ? "Updating..." : "Mark Order Complete"}
          </button>
        </div>
      </div>
    </>
  );
}
