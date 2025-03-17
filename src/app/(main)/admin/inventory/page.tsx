import { DeletePartDialog } from "@/components/admin/inventory/delete-part-dialog";
import { UpdatePartQuantityForm } from "@/components/admin/inventory/update-part-quantity-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { reqRoles } from "@/features/auth/queries";
import { createPartAction } from "@/features/parts/actions/create-part.action";
import { findAllParts } from "@/features/parts/queries";
import { faAdd, faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { notFound } from "next/navigation";

export default async function Page() {
  const profile = await reqRoles(["ADMIN"]);
  if (!profile) notFound();

  const { data: parts } = await findAllParts();

  return (
    <div className="container mx-auto space-y-4 px-4 py-8">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Manage Inventory</h1>
        <Button asLink href="/dashboard">
          <FontAwesomeIcon icon={faLeftLong} />
        </Button>
      </div>

      <div className="bg-muted h-1" />

      <form action={createPartAction} className="flex gap-2">
        <div>
          <label htmlFor="name" className="sr-only">
            Name
          </label>
          <Input type="text" id="name" name="name" placeholder="Name" />
        </div>

        <div>
          <label htmlFor="quantity" className="sr-only">
            Quantity
          </label>
          <Input
            type="number"
            id="quantity"
            name="quantity"
            placeholder="Quantity"
          />
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
            <th className="bg-muted px-6 py-3 text-start">name</th>
            <th className="bg-muted px-6 py-3 text-start">quantity</th>
            <th className="bg-muted px-6 py-3 text-start" />
          </tr>
        </thead>

        <tbody>
          {parts?.map((part) => (
            <tr key={part.id} className="divide-x">
              <td className="px-6 py-3">{part.name}</td>
              <td className="px-6 py-3">
                <UpdatePartQuantityForm part={part} />
              </td>
              <td className="px-6 py-3">
                <DeletePartDialog partId={part.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
