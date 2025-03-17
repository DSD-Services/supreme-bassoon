import { Button } from "@/components/ui/button";
import { CreateTechnicianServer } from "@/features/users/components/create-technician-server";
import { reqRoles } from "@/features/auth/queries";
import { findAllProfiles } from "@/features/profiles/queries";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { notFound } from "next/navigation";
import { TechnicianList } from "@/components/admin/technicians/technician-list";

export default async function Page() {
  const profile = await reqRoles(["ADMIN"]);
  if (!profile) notFound();

  const { data: profiles } = await findAllProfiles({ role: "TECHNICIAN" });

  return (
    <div className="container mx-auto space-y-4 px-4 py-8">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Manage Technicians
        </h1>
        <Button asLink href="/dashboard">
          <FontAwesomeIcon icon={faLeftLong} />
        </Button>
      </div>

      <div className="bg-muted h-1" />

      <div className="flex justify-end">
        <CreateTechnicianServer />
      </div>

      <div className="bg-muted h-1" />

      <TechnicianList initialProfiles={profiles ?? []} />
    </div>
  );
}
