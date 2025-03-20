import WorkOrderList from "@/features/technician-details/dashboard/components/work-order-list";
import TechnicianCalendar from "./tech-calendar";

export default function TechnicianDashboardPageComponent() {
  return (
    <div className="m-2 md:m-4">
      <div className="px-10">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="bg-muted h-1" />
      </div>
      <h2 className="pt-4 pl-10 text-xl font-semibold text-blue-800">
        Your Schedule
      </h2>
      <WorkOrderList />
      <h2 className="pt-2 pl-10 text-xl font-semibold text-blue-800">
        Your Calendar
      </h2>
      <TechnicianCalendar />
    </div>
  );
}
