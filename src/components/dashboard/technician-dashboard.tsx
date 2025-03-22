import WorkOrderList from "@/features/dashboard/components/work-order-list";
import TechnicianCalendar from "@/features/technician-details/components/tech-calendar";

export default function TechnicianDashboard() {
  return (
    <div className="container mx-auto space-y-4 px-2 py-12">
      <div className="px-2 md:px-4 lg:px-10">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="bg-muted h-1" />
        <h2 className="pt-4 text-xl font-semibold text-blue-800">
          Your Work Orders
        </h2>
        <WorkOrderList />
        <h2 className="pt-4 text-xl font-semibold text-blue-800">
          Your Schedule
        </h2>
        <TechnicianCalendar />
      </div>
    </div>
  );
}
