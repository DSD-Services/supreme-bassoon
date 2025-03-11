import { UpdatePartQuantityForm } from "@/components/admin/dashboard/inventory-panel.tsx/update-part-quantity-form";
import { getAuthUser } from "@/features/auth/queries";
import { createClient } from "@/utils/supabase/server";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export default async function Page() {
  const user = await getAuthUser();
  if (!user) redirect("/login");

  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .eq("role", "ADMIN")
    .single();
  if (!profile) notFound();

  const { data: parts } = await supabase
    .from("parts")
    .select()
    .order("id", { ascending: true });

  console.log(parts);

  return (
    <div className="container mx-auto space-y-4 px-4 py-8">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Manage Inventory</h1>
        <Link
          href="/a/dashboard"
          className="bg-primary text-primary-foreground hover:bg-primary/80 rounded px-4 py-2 text-sm font-bold transition"
        >
          <FontAwesomeIcon icon={faLeftLong} />
        </Link>
      </div>

      <div className="bg-muted h-1" />

      <table className="mt-4 table-auto divide-y">
        <thead>
          <tr className="divide-x">
            <th className="bg-muted px-6 py-3 text-start">id</th>
            <th className="bg-muted px-6 py-3 text-start">name</th>
            <th className="bg-muted px-6 py-3 text-start">quantity</th>
          </tr>
        </thead>

        <tbody>
          {parts?.map((part) => (
            <tr key={part.id} className="divide-x">
              <td className="px-6 py-3">{part.id}</td>
              <td className="px-6 py-3">{part.name}</td>
              <td className="px-6 py-3">
                <UpdatePartQuantityForm part={part} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
