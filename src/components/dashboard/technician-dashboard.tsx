import { protect } from "@/features/auth/queries";
import WorkOrderList from "@/features/dashboard/components/work-order-list";
import TechnicianCalendar from "@/features/technician-details/components/tech-calendar";
import { generateBreakEvents } from "@/features/technician-details/lib/generate-break-events";
import TransformWorkOrders from "@/features/technician-details/lib/transform-work-orders";
import {
  findTechnicianSchedule,
  getTechnicianBusinessHours,
} from "@/features/technician-details/queries";

export default async function TechnicianDashboard() {
  const { userId } = await protect();

  const { data, error } = await findTechnicianSchedule(userId);

  if (error || !data) {
    return <div>Error: {error || "No data found"}</div>;
  }

  const { technicianDetails, workOrders } = data;

  if (error) {
    return <div>Error: {error}</div>;
  }
  const businessHours = await getTechnicianBusinessHours(userId);
  const breakEvents = await generateBreakEvents(technicianDetails);
  const calendarWorkOrders = TransformWorkOrders(workOrders);

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
        <p className="text-center text-sm text-slate-700 italic">
          (Appointments displayed for past 30 and next 30 days)
        </p>
        <TechnicianCalendar
          businessHours={businessHours}
          breakEvents={breakEvents}
          workOrders={calendarWorkOrders}
        />
      </div>
    </div>
  );
}
