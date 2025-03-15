import { ClientCard } from "@/components/admin/clients/client-card";
import { Button } from "@/components/ui/button";
import { reqRoles } from "@/features/auth/queries";
import { findAllProfiles } from "@/features/profiles/queries";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { notFound } from "next/navigation";

export default async function Page() {
  const profile = await reqRoles(["ADMIN"]);
  if (!profile) notFound();

  const { data: profiles } = await findAllProfiles({ role: "CLIENT" });

  return (
    <div className="container mx-auto space-y-4 px-4 py-8">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Manage Clients</h1>
        <Button asLink href="/dashboard">
          <FontAwesomeIcon icon={faLeftLong} />
        </Button>
      </div>

      <div className="bg-muted h-1" />

      {profiles?.map((profile) => (
        <ClientCard key={profile.id} profile={profile} />
      ))}
    </div>
  );
}
