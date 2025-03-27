import { Button } from "@/components/ui/button";
import { CreateTechnicianServer } from "@/features/users/components/create-technician-server";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Metadata } from "next";
import { isAdmin } from "@/features/auth/auth-guards";
import { SearchForm } from "@/components/admin/search-form";
import { Suspense } from "react";
import { TechnicianListServer } from "@/components/admin/technicians/technician-list-server";
import { TechnicianListSkeleton } from "@/components/admin/technicians/technician-list-skeleton";

export const metadata: Metadata = {
  title: "Manage Technicians",
};

type PageProps = { searchParams: Promise<{ q: string }> };

export default async function Page({ searchParams }: PageProps) {
  await isAdmin({ action: "redirect" });

  const initialQuery = (await searchParams).q || "";

  return (
    <div className="container mx-auto space-y-4 px-4 py-12">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Manage Technicians
        </h1>
        <Button size="sm" asLink href="/dashboard">
          <FontAwesomeIcon icon={faLeftLong} />
        </Button>
      </div>

      <div className="bg-muted h-1" />

      <div className="flex justify-end">
        <CreateTechnicianServer />
      </div>

      <div className="bg-muted h-1" />

      <SearchForm initialQuery={initialQuery} />

      <div className="bg-muted h-1" />

      <Suspense
        key={`technician-list-${initialQuery}`}
        fallback={<TechnicianListSkeleton />}
      >
        <TechnicianListServer initialQuery={initialQuery} />
      </Suspense>
    </div>
  );
}
