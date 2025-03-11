import { TechnicianCard } from "@/components/admin/dashboard/technician-panel/technician-card";
import { createClient } from "@/utils/supabase/server";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

const links = [
  "technicians",
  "inventory",
  "work-orders",
  "users",
  "departments",
  "services",
] as const;

type PageProps = {
  searchParams: Promise<{ panel: (typeof links)[number] }>;
};

export default async function Page({ searchParams }: PageProps) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .eq("role", "ADMIN")
    .single();

  if (!profile) notFound();

  const panel = (await searchParams).panel;

  switch (panel) {
    case "technicians":
      return <TechniciansPanel />;
    default:
      return <Dashboard />;
  }
}

const Dashboard = () => {
  return (
    <div className="container mx-auto space-y-4 px-4 py-8">
      <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
      <div className="bg-muted h-1" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {links.map((link) => (
          <Link
            key={link}
            href={`/a/dashboard?panel=${link}`}
            className="aspect-[3/1] content-center rounded-xl border p-4 text-center text-2xl capitalize shadow transition hover:shadow-xl"
          >
            {link.replace("-", " ")}
          </Link>
        ))}
      </div>
    </div>
  );
};

const TechniciansPanel = async () => {
  const supabase = await createClient();

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
    .eq("role", "TECHNICIAN");

  return (
    <div className="container mx-auto space-y-4 px-4 py-8">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Admin Dashboard - Technicians Panel
        </h1>
        <Link
          href="/a/dashboard"
          className="bg-primary hover:bg-primary/70 text-primary-foreground flex items-center rounded px-4 py-2 font-bold transition"
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
};
