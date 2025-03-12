import { AdminDashboard } from "@/components/dashboard/admin-dashboard";
import { ClientDashboard } from "@/components/dashboard/client-dashboard";
import { getAuthUser } from "@/features/auth/queries";
import { findOneProfile } from "@/features/profiles/queries";
import TechnicianDashboardPageComponent from "@/features/technician-details/components/tech-dashboard-page-component";
import { notFound, redirect } from "next/navigation";

export default async function Page() {
  const user = await getAuthUser();
  if (!user) redirect("/login");

  const { data: profile } = await findOneProfile(user.id);
  if (!profile) notFound();

  switch (profile.role) {
    case "CLIENT":
      return <ClientDashboard />;
    case "TECHNICIAN":
      return <TechnicianDashboardPageComponent />;
    case "ADMIN":
      return <AdminDashboard />;
    default:
      notFound();
  }
}
