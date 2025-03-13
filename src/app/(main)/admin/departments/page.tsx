import { DeleteDepartmentDialog } from "@/components/admin/departments/delete-department-dialog";
import { UpdateDepartmentForm } from "@/components/admin/departments/update-department-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { reqRoles } from "@/features/auth/queries";
import { createDepartmentAction } from "@/features/departments/actions/create-department.action";
import { findAllDepartments } from "@/features/departments/queries";
import { faAdd, faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { notFound } from "next/navigation";

export default async function Page() {
  const profile = await reqRoles(["ADMIN"]);
  if (!profile) notFound();

  const { data: departments } = await findAllDepartments();

  return (
    <div className="container mx-auto space-y-4 px-4 py-8">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Manage Inventory</h1>
        <Button asLink href="/dashboard">
          <FontAwesomeIcon icon={faLeftLong} />
        </Button>
      </div>

      <div className="bg-muted h-1" />

      <form action={createDepartmentAction} className="flex gap-2">
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
          </tr>
        </thead>

        <tbody>
          {departments?.map((department) => (
            <tr key={department.id} className="divide-x">
              <td className="px-6 py-3">{department.id}</td>
              <td className="px-6 py-3">
                <UpdateDepartmentForm department={department} />
              </td>
              <td className="px-6 py-3">
                <DeleteDepartmentDialog departmentId={department.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
