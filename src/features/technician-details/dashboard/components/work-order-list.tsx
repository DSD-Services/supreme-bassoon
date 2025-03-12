import WorkOrderCard from "./work-order-card";
import { workOrderData } from "./work-order-data";

export default function WorkOrderList() {
  const data = workOrderData;
  return (
    <div className="m-1 flex flex-col items-center rounded-lg bg-gray-200 p-2 text-xs md:mx-6 md:mb-3 lg:mx-10 lg:my-4 lg:py-4">
      {data && data.length > 0
        ? data.map((item) => <WorkOrderCard key={item.id} data={item} />)
        : null}
    </div>
  );
}
