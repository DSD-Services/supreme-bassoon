import { UpdateServiceTypeDialog } from "@/components/admin/service-types/delete-service-type-dialog";
import { UpdateServiceTypeDepartmentDialog } from "@/components/admin/service-types/update-service-type-department-dialog";
import { UpdateServiceTypeForm } from "@/components/admin/service-types/update-service-type-form";
import { ViewServiceTypePartsServer } from "@/components/admin/service-types/view-service-type-parts-server";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { reqRoles } from "@/features/auth/queries";
import { findAllDepartments } from "@/features/departments/queries";
import { createServiceTypeAction } from "@/features/service-types/actions/create-service-type.action";
import { findAllServiceTypes } from "@/features/service-types/queries";
import { faAdd, faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { notFound } from "next/navigation";

export default async function Page() {
  const profile = await reqRoles(["ADMIN"]);
  if (!profile) notFound();

  const { data: serviceTypes } = await findAllServiceTypes();
  const { data: departments } = await findAllDepartments();

  return (
    <div className="container mx-auto space-y-4 px-4 py-8">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Manage Service Types
        </h1>
        <Button asLink href="/dashboard">
          <FontAwesomeIcon icon={faLeftLong} />
        </Button>
      </div>

      <div className="bg-muted h-1" />

      <form action={createServiceTypeAction} className="flex gap-2">
        <div>
          <label htmlFor="name" className="sr-only">
            Name
          </label>
          <Input type="text" id="name" name="name" placeholder="Name" />
        </div>

        <Button type="submit" variant="ghost">
          <FontAwesomeIcon icon={faAdd} />
          Insert
        </Button>
      </form>

      <div className="bg-muted h-1" />

      <table className="mt-4 table-auto divide-y">
        <thead>
          <tr className="divide-x">
            <th className="bg-muted px-6 py-3 text-start">id</th>
            <th className="bg-muted px-6 py-3 text-start">name</th>
            <th className="bg-muted px-6 py-3 text-start" />
            <th className="bg-muted px-6 py-3 text-start">department</th>
            <th className="bg-muted px-6 py-3 text-start">
              service type parts
            </th>
          </tr>
        </thead>

        <tbody>
          {serviceTypes?.map((serviceType) => (
            <tr key={serviceType.id} className="divide-x">
              <td className="px-6 py-3">{serviceType.id}</td>
              <td className="px-6 py-3">
                <UpdateServiceTypeForm serviceType={serviceType} />
              </td>
              <td className="px-6 py-3">
                <UpdateServiceTypeDialog serviceTypeId={serviceType.id} />
              </td>
              <td className="px-6 py-3">
                <UpdateServiceTypeDepartmentDialog
                  serviceType={serviceType}
                  departments={departments ?? []}
                />
              </td>
              <td className="px-6 py-3">
                <ViewServiceTypePartsServer serviceType={serviceType} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
