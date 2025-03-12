import { findAllWorkOrdersHydrated } from "@/features/work-orders/queries";
import WorkOrderCard from "./work-order-card";

export default async function WorkOrderList() {
  const { data: workOrders } = await findAllWorkOrdersHydrated();

  return (
    <div className="m-1 flex flex-col items-center rounded-lg bg-gray-200 p-2 text-xs md:mx-6 md:mb-3 lg:mx-10 lg:my-4 lg:py-4">
      {workOrders
        ? workOrders.map((workOrder) => (
            <WorkOrderCard key={workOrder.id} workOrder={workOrder} />
          ))
        : null}
    </div>
  );
}
