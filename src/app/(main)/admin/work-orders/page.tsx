import { Button } from "@/components/ui/button";
import { reqRoles } from "@/features/auth/queries";
import WorkOrderList from "@/features/dashboard/components/work-order-list";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Work Orders",
};

export default async function Page() {
  const profile = await reqRoles(["ADMIN"]);
  if (!profile) notFound();

  return (
    <div className="container mx-auto space-y-4 px-2 py-12">
      <div className="px-2 md:px-4 lg:px-10">
        <div className="flex items-center justify-between gap-2 pb-4">
          <h1 className="text-3xl font-bold tracking-tight">
            Manage Work Orders
          </h1>
          <Button asLink href="/dashboard">
            <FontAwesomeIcon icon={faLeftLong} />
          </Button>
        </div>
        <div className="bg-muted mb-4 h-1" />
        <WorkOrderList />
      </div>
    </div>
  );
}
