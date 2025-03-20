import { Button } from "@/components/ui/button";
import { reqRoles } from "@/features/auth/queries";
import WorkOrderList from "@/features/technician-details/dashboard/components/work-order-list";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { notFound } from "next/navigation";

export default async function Page() {
  const profile = await reqRoles(["ADMIN"]);
  if (!profile) notFound();

  return (
    <div className="px-4">
      <div className="flex items-center justify-between gap-2 px-4 pt-8 pb-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Manage Work Orders
        </h1>
        <Button asLink href="/dashboard">
          <FontAwesomeIcon icon={faLeftLong} />
        </Button>
      </div>
      <div className="bg-muted h-1" />
      <WorkOrderList />
    </div>
  );
}
