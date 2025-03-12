// TODO - update supabase data sending
import SmallLabel from "@/components/dashboard/small-label";
import ServicePartsTable from "./service-parts-table";
import WorkOrderGroup from "@/components/dashboard/work-order-group";
import type { HydratedWorkOrder } from "@/utils/supabase/types";
import { WorkOrderActionButtons } from "./work-order-action-buttons";

interface ExpandedWorkOrderProps {
  workOrder: HydratedWorkOrder;
  aggregatedParts: {
    [key: number]: {
      name: string;
      qtyNeed: number;
      qtyReserved: number;
    };
  };
}

export default function ExpandedWorkOrder({
  workOrder,
  aggregatedParts,
}: ExpandedWorkOrderProps) {
  return (
    <>
      <div className="col-span-2 lg:col-span-2">
        <WorkOrderGroup labelText="Client Primary Phone">
          {workOrder.client.primary_phone}
        </WorkOrderGroup>
      </div>
      <div className="col-span-4 lg:col-span-2">
        <WorkOrderGroup labelText="Client Secondary Phone">
          {workOrder.client.secondary_phone}
        </WorkOrderGroup>
      </div>
      <div className="col-span-6">
        <WorkOrderGroup labelText="Client Email">
          {workOrder.client.email}
        </WorkOrderGroup>
      </div>
      <div className="col-span-6">
        <div className="flex justify-center">
          <ServicePartsTable data={aggregatedParts} />
        </div>
      </div>
      <div className="col-span-6 mt-2">
        <div className="flex justify-center">
          <div className="w-full rounded-md bg-gray-200 p-2">
            <SmallLabel>Appointment notes:</SmallLabel>
            <p className="pt-1 text-xs md:text-sm">
              {workOrder.appointment_notes}
            </p>
          </div>
        </div>
      </div>
      <div className="col-span-6 mt-2 pb-2">
        <WorkOrderActionButtons
          workOrderId={workOrder.id}
          currentWorkOrderStatus={workOrder.status}
        />
      </div>
    </>
  );
}
