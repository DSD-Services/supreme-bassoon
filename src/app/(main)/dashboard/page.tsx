import { AdminDashboard } from "@/components/dashboard/admin-dashboard";
import { ClientDashboard } from "@/components/dashboard/client-dashboard";
import { protect } from "@/features/auth/queries";
import { findOneProfile } from "@/features/profiles/queries";
import TechnicianDashboardPageComponent from "@/features/technician-details/components/tech-dashboard-page-component";
import { notFound } from "next/navigation";

export default async function Page() {
  const { userId } = await protect({ action: "redirect" });

  const { data: profile } = await findOneProfile(userId);
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
