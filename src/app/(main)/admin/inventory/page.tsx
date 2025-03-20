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
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Inventory",
};

export default async function Page() {
  const profile = await reqRoles(["ADMIN"]);
  if (!profile) notFound();

  const { data: parts } = await findAllParts();

  return (
    <div className="container mx-auto space-y-4 px-4 py-12">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Manage Inventory</h1>
        <Button asLink href="/dashboard">
          <FontAwesomeIcon icon={faLeftLong} />
        </Button>
      </div>

      <div className="bg-muted h-1" />

      <form
        action={createPartAction}
        className="flex flex-col gap-2 sm:flex-row"
      >
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

        <div>
          <label htmlFor="manufacturer" className="sr-only">
            Manufacturer
          </label>
          <Input
            type="text"
            id="manufacturer"
            name="manufacturer"
            placeholder="Manufacturer"
          />
        </div>

        <Button type="submit" variant="ghost" className="self-start">
          <FontAwesomeIcon icon={faAdd} />
          Insert
        </Button>
      </form>

      <div className="bg-muted h-1" />

      <div className="overflow-x-auto">
        <table className="mt-4 table-auto divide-y">
          <thead>
            <tr className="divide-x">
              <th className="bg-muted px-6 py-3 text-start capitalize">name</th>
              <th className="bg-muted px-6 py-3 text-start capitalize">
                quantity
              </th>
              <th className="bg-muted px-6 py-3 text-start capitalize">
                manufacturer
              </th>
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
                <td className="px-6 py-3">{part.manufacturer}</td>
                <td className="px-6 py-3">
                  <DeletePartDialog partId={part.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
