import { Button } from "@/components/ui/button";
import { faLeftLong, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Metadata } from "next";
import { isAdmin } from "@/features/auth/auth-guards";
import { CreateDepartmentForm } from "@/features/departments/components/create-department-form";
import { DepartmentListServer } from "@/features/departments/components/department-list-server";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Manage Departments",
};

export default async function Page() {
  await isAdmin({ action: "redirect" });

  return (
    <div className="container mx-auto space-y-4 px-4 py-12">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Manage Departments
        </h1>
        <Button size="sm" asLink href="/dashboard">
          <FontAwesomeIcon icon={faLeftLong} />
        </Button>
      </div>

      <div className="bg-muted h-1" />

      <CreateDepartmentForm />

      <div className="bg-muted h-1" />

      <div className="overflow-x-auto">
        <table className="mt-4 table-auto divide-y">
          <thead>
            <tr className="divide-x">
              <th className="bg-muted px-6 py-3 text-start capitalize">name</th>
              <th className="bg-muted px-6 py-3 text-start" />
            </tr>
          </thead>

          <Suspense
            fallback={
              <tbody>
                <tr>
                  <td className="px-6 py-3">
                    <FontAwesomeIcon
                      icon={faSpinner}
                      className="animate-spin"
                    />
                  </td>
                </tr>
              </tbody>
            }
          >
            <DepartmentListServer />
          </Suspense>
        </table>
      </div>
    </div>
  );
}
