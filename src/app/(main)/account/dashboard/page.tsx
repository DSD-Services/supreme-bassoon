import { getAuthUser } from "@/features/auth/queries";
import { findOneProfile } from "@/features/profile/queries";
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

export default async function Page() {
  const user = await getAuthUser();
  if (!user) redirect("/login");

  const { data: profile } = await findOneProfile(user.id, { role: "ADMIN" });
  if (!profile) notFound();

  return (
    <div className="container mx-auto space-y-4 px-4 py-8">
      <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
      <div className="bg-muted h-1" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {links.map((link) => (
          <Link
            key={link}
            href={`/account/dashboard/${link}`}
            className="aspect-[3/1] content-center rounded-xl border p-4 text-center text-2xl capitalize shadow transition hover:shadow-xl"
          >
            {link.replace("-", " ")}
          </Link>
        ))}
      </div>
    </div>
  );
}
