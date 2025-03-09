import WorkOrderCard from './work-order-card';
import { workOrderData } from './work-order-data';

export default function WorkOrderList() {
  const data = workOrderData;
  return (
    <div className='bg-blue-100 text-xs m-1 p-2 md:mx-6 md:mb-3 lg:mx-10 lg:my-4 lg:py-4 rounded-lg flex flex-col items-center'>
      {data && data.length > 0
        ? data.map((item) => <WorkOrderCard key={item.id} data={item} />)
        : null}
    </div>
  );
}
