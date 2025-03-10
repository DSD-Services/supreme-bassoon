import TechnicianDashboardPageComponent from "@/features/technician/components/tech-dashboard-page-component";
import { createClient } from "@/utils/supabase/server";
import { notFound, redirect } from "next/navigation";

export default async function Page() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) notFound();

  if (!["TECHNICIAN", "ADMIN"].includes(profile.role)) {
    redirect("/account");
  }

  if (profile.role === "TECHNICIAN") {
    return <TechnicianDashboardPageComponent />;
  }

  return <div>Admin Hello</div>;
}
