import { DeletePartDialog } from "@/features/parts/components/delete-part-dialog";
import { UpdatePartDialog } from "@/features/parts/components/update-part-quantity-form";
import { Button } from "@/components/ui/button";
import { reqRoles } from "@/features/auth/queries";
import { findAllParts } from "@/features/parts/queries";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { CreatePartForm } from "@/features/parts/components/create-part-form";
import { SearchForm } from "@/components/admin/search-form";

export const metadata: Metadata = {
  title: "Manage Inventory",
};

type PageProps = { searchParams: Promise<{ q: string }> };

export default async function Page({ searchParams }: PageProps) {
  const profile = await reqRoles(["ADMIN"]);
  if (!profile) notFound();

  const initialQuery = (await searchParams).q || "";

  const { data: parts } = await findAllParts({ query: initialQuery });

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
                <th className="px-3 py-1.5 text-start text-sm whitespace-nowrap sm:text-base"></th>
                <th className="px-3 py-1.5 text-start text-sm whitespace-nowrap sm:text-base"></th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {parts?.map((part) => (
                <tr key={part.id} className="divide-x">
                  <td className="px-3 py-1.5 text-sm whitespace-nowrap sm:text-base">
                    {part.name}
                  </td>
                  <td className="px-3 py-1.5 text-sm whitespace-nowrap tabular-nums sm:text-base">
                    {part.quantity}
                  </td>
                  <td className="px-3 py-1.5 text-sm whitespace-nowrap sm:text-base">
                    {part.manufacturer}
                  </td>
                  <td className="px-3 py-1.5 text-sm whitespace-nowrap sm:text-base">
                    <UpdatePartDialog part={part} />
                  </td>
                  <td className="px-3 py-1.5 text-sm whitespace-nowrap sm:text-base">
                    <DeletePartDialog partId={part.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
