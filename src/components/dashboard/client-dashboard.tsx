import WorkOrderList from "@/features/dashboard/components/work-order-list";
import { Button } from "../ui/button";

export const ClientDashboard = () => {
  return (
    <div className="m-0 py-12 md:m-2 md:m-4">
      <div className="px-4 lg:px-10">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="bg-muted h-1" />
      </div>
      <h2 className="pt-2 pl-4 text-xl font-semibold text-blue-800 lg:pl-10">
        Schedule Appointment
      </h2>
      <div className="m-0 flex flex-col items-center gap-2 rounded-none bg-blue-50 p-2 text-xs md:m-2 md:mx-2 md:mb-3 md:gap-3 md:rounded-lg md:p-3 lg:mx-10 lg:mb-4 lg:p-4">
        <Button asLink href="/schedule">
          Schedule an appointment now
        </Button>
      </div>
      <h2 className="pt-4 pl-4 text-xl font-semibold text-blue-800 lg:pl-10">
        Appointments
      </h2>
      <WorkOrderList />
    </div>
  );
};
