import { ClientList } from "@/components/admin/clients/client-list";
import { Button } from "@/components/ui/button";
import { reqRoles } from "@/features/auth/queries";
import { findAllProfiles } from "@/features/profiles/queries";
import { CreateUserDialog } from "@/features/users/components/create-user-dialog";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Clients",
};

export default async function Page() {
  const profile = await reqRoles(["ADMIN"]);
  if (!profile) notFound();

  const { data: profiles } = await findAllProfiles({ role: "CLIENT" });

  return (
    <div className="container mx-auto space-y-4 px-4 py-12">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Manage Clients</h1>
        <Button asLink href="/dashboard">
          <FontAwesomeIcon icon={faLeftLong} />
        </Button>
      </div>

      <div className="bg-muted h-1" />

      <div className="flex justify-end">
        <CreateUserDialog role={"CLIENT"} />
      </div>

      <div className="bg-muted h-1" />

      <ClientList initialProfiles={profiles ?? []} />
    </div>
  );
}
