import { Button } from "@/components/ui/button";
import { getAuthUser } from "@/features/auth/queries";
import { findOneProfile } from "@/features/profiles/queries";
import WorkOrderCard from "@/features/technician-details/dashboard/components/work-order-card";
import { findAllWorkOrdersHydrated } from "@/features/work-orders/queries";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { notFound, redirect } from "next/navigation";

export default async function Page() {
  const user = await getAuthUser();
  if (!user) redirect("/login");

  const { data: profile } = await findOneProfile(user.id, { role: "ADMIN" });
  if (!profile) notFound();

  const { data: workOrders } = await findAllWorkOrdersHydrated();

  return (
    <div className="container mx-auto space-y-4 px-4 py-8">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Manage Work Orders
        </h1>
        <Button asLink href="/dashboard">
          <FontAwesomeIcon icon={faLeftLong} />
        </Button>
      </div>

      <div className="bg-muted h-1" />

      <div className="m-1 flex flex-col items-center rounded-lg bg-gray-200 p-2 text-xs md:mx-6 md:mb-3 lg:mx-10 lg:my-4 lg:py-4">
        {workOrders
          ? workOrders.map((workOrder) => (
              <WorkOrderCard key={workOrder.id} workOrder={workOrder} />
            ))
          : null}
      </div>
    </div>
  );
}
