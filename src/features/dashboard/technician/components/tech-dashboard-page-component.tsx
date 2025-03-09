import WorkOrderList from "./work-order-list";

export default function TechnicianDashboardPageComponent() {
  return (
    <>
      <div className="p-2">Technician Dashboard</div>
      <h2 className="text-primary pl-2 font-bold md:pl-6 lg:pl-10">
        Work Orders Scheduled Today - {new Date().toLocaleDateString()}
      </h2>
      <WorkOrderList />
    </>
  );
}
