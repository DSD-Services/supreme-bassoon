import { TechnicianCard } from "@/components/admin/dashboard/technicians/technician-card";
import { Button } from "@/components/ui/button";
import { getAuthUser } from "@/features/auth/queries";
import { findOneProfile } from "@/features/profile/queries";
import { createClient } from "@/utils/supabase/server";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { notFound, redirect } from "next/navigation";

export default async function Page() {
  const user = await getAuthUser();
  if (!user) redirect("/login");

  const { data: profile } = await findOneProfile(user.id, { role: "ADMIN" });
  if (!profile) notFound();

  const supabase = await createClient();

  const { data: profiles } = await supabase
    .from("profiles")
    .select(
      `
          *,
          technician_details (
            *,
            departments(*)
          )
        `,
    )
    .eq("role", "TECHNICIAN")
    .order("first_name", { ascending: true });

  return (
    <div className="container mx-auto space-y-4 px-4 py-8">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Manage Technicians
        </h1>
        <Button asLink href="/account/dashboard">
          <FontAwesomeIcon icon={faLeftLong} />
        </Button>
      </div>

      <div className="bg-muted h-1" />

      {profiles?.map((profile) => (
        <TechnicianCard key={profile.id} profile={profile} />
      ))}
    </div>
  );
}
