import { TechnicianCard } from "@/components/admin/dashboard/technician-panel/technician-card";
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

  const { data: profiles } = await supabase
    .from("profiles")
    .select(
      `
          *,
          technician_details (
            *,
            departments (name)
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
        <Link
          href="/a/dashboard"
          className="bg-primary text-primary-foreground hover:bg-primary/80 rounded px-4 py-2 text-sm font-bold transition"
        >
          <FontAwesomeIcon icon={faLeftLong} />
        </Link>
      </div>

      <div className="bg-muted h-1" />

      {profiles?.map((profile) => (
        <TechnicianCard key={profile.id} profile={profile} />
      ))}
    </div>
  );
}
