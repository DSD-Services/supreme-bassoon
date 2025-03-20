import { AdminDashboard } from "@/components/dashboard/admin-dashboard";
import { ClientDashboard } from "@/components/dashboard/client-dashboard";
import { protect } from "@/features/auth/queries";
import { findOneProfile } from "@/features/profiles/queries";
import TechnicianDashboard from "@/components/dashboard/technician-dashboard";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Page() {
  const { userId } = await protect({ action: "redirect" });

  const { data: profile } = await findOneProfile(userId);
  if (!profile) notFound();

  switch (profile.role) {
    case "CLIENT":
      return <ClientDashboard />;
    case "TECHNICIAN":
      return <TechnicianDashboard />;
    case "ADMIN":
      return <AdminDashboard />;
    default:
      notFound();
  }
}
