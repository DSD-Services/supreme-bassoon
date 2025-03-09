import WorkOrderList from './work-order-list';

export default function TechnicianDashboardPageComponent() {
  return (
    <>
      <div className='p-2'>Technician Dashboard</div>
      <h2 className='pl-2 md:pl-6 lg:pl-10 text-blue-800 font-bold'>
        Work Orders Scheduled Today - {new Date().toLocaleDateString()}
      </h2>
      <WorkOrderList />
    </>
  );
}
