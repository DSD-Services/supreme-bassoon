import { Button } from "@/components/ui/button";
import { CreateUserDialog } from "@/features/users/components/create-user-dialog";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Metadata } from "next";
import { isAdmin } from "@/features/auth/auth-guards";
import { SearchForm } from "@/components/admin/search-form";
import { ClientListServer } from "@/components/admin/clients/client-list-server";
import { Suspense } from "react";
import { ClientListSkeleton } from "@/components/admin/clients/client-list-skeleton";

export const metadata: Metadata = {
  title: "Manage Clients",
};

type PageProps = { searchParams: Promise<{ q: string }> };

export default async function Page({ searchParams }: PageProps) {
  await isAdmin({ action: "redirect" });

  const initialQuery = (await searchParams).q || "";

  return (
    <div className="container mx-auto space-y-4 px-4 py-12">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Manage Clients</h1>
        <Button size="sm" href="/dashboard" asLink>
          <FontAwesomeIcon icon={faLeftLong} />
        </Button>
      </div>

      <div className="bg-muted h-1" />

      <div className="flex justify-end">
        <CreateUserDialog role={"CLIENT"} />
      </div>

      <div className="bg-muted h-1" />

      <SearchForm initialQuery={initialQuery} />

      <Suspense key={initialQuery} fallback={<ClientListSkeleton />}>
        <ClientListServer initialQuery={initialQuery} />
      </Suspense>
    </div>
  );
}
