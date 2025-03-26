import { Button } from "@/components/ui/button";
import { faLeftLong, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Metadata } from "next";
import { CreatePartForm } from "@/features/parts/components/create-part-form";
import { SearchForm } from "@/components/admin/search-form";
import { isAdmin } from "@/features/auth/auth-guards";
import { PartListServer } from "@/features/parts/components/part-list-server";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Manage Inventory",
};

type PageProps = { searchParams: Promise<{ q: string }> };

export default async function Page({ searchParams }: PageProps) {
  await isAdmin({ action: "redirect" });

  const initialQuery = (await searchParams).q || "";

  return (
    <div className="container mx-auto space-y-4 px-4 py-12">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Manage Inventory</h1>
        <Button asLink href="/dashboard">
          <FontAwesomeIcon icon={faLeftLong} />
        </Button>
      </div>

      <div className="bg-muted h-1" />

      <CreatePartForm />

      <div className="bg-muted h-1" />

      <SearchForm initialQuery={initialQuery} />

      <div className="bg-muted h-1" />

      <div className="rounded-md border">
        <div className="max-h-[60vh] overflow-auto">
          <table className="min-w-full divide-y">
            <thead className="bg-muted sticky top-0 z-10">
              <tr className="divide-x">
                <th className="px-3 py-1.5 text-start text-sm whitespace-nowrap capitalize sm:text-base">
                  name
                </th>
                <th className="px-3 py-1.5 text-start text-sm whitespace-nowrap capitalize sm:text-base">
                  quantity
                </th>
                <th className="px-3 py-1.5 text-start text-sm whitespace-nowrap capitalize sm:text-base">
                  manufacturer
                </th>
                <th className="px-3 py-1.5 text-start text-sm whitespace-nowrap sm:text-base" />
                <th className="px-3 py-1.5 text-start text-sm whitespace-nowrap sm:text-base" />
              </tr>
            </thead>

            <Suspense
              key={initialQuery}
              fallback={
                <tbody>
                  <tr>
                    <td className="px-3 py-1.5">
                      <FontAwesomeIcon
                        icon={faSpinner}
                        className="animate-spin"
                      />
                    </td>
                  </tr>
                </tbody>
              }
            >
              <PartListServer initialQuery={initialQuery} />
            </Suspense>
          </table>
        </div>
      </div>
    </div>
  );
}
