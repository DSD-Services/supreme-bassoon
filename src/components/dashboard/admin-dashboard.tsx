import Link from "next/link";

const links = [
  "technicians",
  "inventory",
  "work-orders",
  "clients",
  "departments",
  "service-types",
] as const;

export const AdminDashboard = () => {
  return (
    <div className="container mx-auto space-y-4 px-4 py-8">
      <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
      <div className="bg-muted h-1" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => (
          <Link
            key={link}
            href={`/admin/${link}`}
            className="aspect-[3/1] content-center rounded-xl border p-4 text-center text-2xl capitalize shadow transition hover:shadow-xl"
          >
            {link.replace("-", " ")}
          </Link>
        ))}
      </div>
    </div>
  );
};
