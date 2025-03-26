import { Button } from "@/components/ui/button";
import { faLeftLong, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Metadata } from "next";
import { isAdmin } from "@/features/auth/auth-guards";
import { ServerTypeListServer } from "@/features/service-types/components/service-type-list-server";
import { CreateServiceTypeForm } from "@/features/service-types/components/create-service-type-form";
import { SearchForm } from "@/components/admin/search-form";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Manage Service Types",
};

type PageProps = { searchParams: Promise<{ q: string }> };
export default async function Page({ searchParams }: PageProps) {
  await isAdmin({ action: "redirect" });

  const initialQuery = (await searchParams).q || "";

  return (
    <div className="container mx-auto space-y-4 px-4 py-12">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Manage Service Types
        </h1>
        <Button size="sm" asLink href="/dashboard">
          <FontAwesomeIcon icon={faLeftLong} />
        </Button>
      </div>

      <div className="bg-muted h-1" />

      <CreateServiceTypeForm />

      <div className="bg-muted h-1" />

      <SearchForm initialQuery={initialQuery} />

      <div className="bg-muted h-1" />

      <div className="overflow-x-auto">
        <table className="mt-4 table-auto divide-y">
          <thead>
            <tr className="divide-x">
              <th className="bg-muted px-2 py-3 text-start text-xs sm:flex sm:px-4 sm:text-sm md:px-6 md:text-base">
                name
              </th>
              <th className="bg-muted px-2 py-3 text-start text-xs sm:px-4 sm:text-sm md:px-6 md:text-base">
                department
              </th>
              <th className="bg-muted px-2 py-3 text-center text-xs whitespace-nowrap sm:px-4 sm:text-start sm:text-sm md:px-6 md:text-base">
                service{" "}
                <span className="-mt-1 block sm:-mt-0 sm:inline">parts</span>
              </th>
              <th className="bg-muted px-6 py-3 text-start" />
            </tr>
          </thead>

          <Suspense
            key={`service-type-list-${initialQuery}`}
            fallback={
              <tbody>
                <tr>
                  <td className="w-full px-6 py-3">
                    <FontAwesomeIcon
                      icon={faSpinner}
                      className="animate-spin"
                    />
                  </td>
                </tr>
              </tbody>
            }
          >
            <ServerTypeListServer initialQuery={initialQuery} />
          </Suspense>
        </table>
      </div>
    </div>
  );
}
