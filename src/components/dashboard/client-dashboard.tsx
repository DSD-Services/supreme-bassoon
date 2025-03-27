import WorkOrderList from "@/features/dashboard/components/work-order-list";
import { Button } from "../ui/button";

export const ClientDashboard = () => {
  return (
    <div className="container mx-auto space-y-4 px-2 py-12">
      <div className="px-2 md:px-4 lg:px-10">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="bg-muted h-1" />
        <h2 className="pt-2 text-xl font-semibold text-blue-800">
          Schedule Appointment
        </h2>
        <div className="m-0 flex flex-col items-center gap-2 rounded-none bg-blue-50 p-2 py-3 text-xs md:mb-3 md:gap-3 md:rounded-lg md:p-3 lg:mb-4 lg:p-4">
          <Button asLink href="/schedule" className="text-sm md:text-base">
            Schedule a new appointment
          </Button>
        </div>
        <h2 className="pt-4 text-xl font-semibold text-blue-800">
          Appointments
        </h2>
        <WorkOrderList />
      </div>
    </div>
  );
};
