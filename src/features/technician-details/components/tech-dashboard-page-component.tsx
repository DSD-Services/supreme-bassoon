import WorkOrderList from "@/features/technician-details/dashboard/components/work-order-list";

export default function TechnicianDashboardPageComponent() {
  return (
    <>
      <div className="p-2">Technician Dashboard</div>
      <h2 className="pl-2 font-bold text-blue-500 md:pl-6 lg:pl-10">
        Work Orders Scheduled Today - {new Date().toLocaleDateString()}
      </h2>
      <WorkOrderList />
    </>
  );
}
