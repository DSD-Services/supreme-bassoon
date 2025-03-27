import { Button } from "@/components/ui/button";
import WorkOrderList from "@/features/dashboard/components/work-order-list";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Metadata } from "next";
import { isAdmin } from "@/features/auth/auth-guards";
import { Suspense } from "react";
import { WorkOrdedListSkeleton } from "@/features/dashboard/components/work-order-list-skeleton";

export const metadata: Metadata = {
  title: "Manage Work Orders",
};

export default async function Page() {
  await isAdmin({ action: "redirect" });

  return (
    <div className="container mx-auto space-y-4 px-2 py-12">
      <div className="px-2 md:px-4 lg:px-10">
        <div className="flex items-center justify-between gap-2 pb-4">
          <h1 className="text-3xl font-bold tracking-tight">
            Manage Work Orders
          </h1>
          <Button size="sm" asLink href="/dashboard">
            <FontAwesomeIcon icon={faLeftLong} />
          </Button>
        </div>
        <div className="bg-muted mb-4 h-1" />
        <Suspense fallback={<WorkOrdedListSkeleton />}>
          <WorkOrderList />
        </Suspense>
      </div>
    </div>
  );
}
