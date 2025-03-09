import { createClient } from "@/utils/supabase/server";
import { notFound, redirect } from "next/navigation";
import type { TechnicianDetail } from "@/utils/supabase/types";

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

  let technicianDetails: TechnicianDetail | null = null;
  if (profile.role === "TECHNICIAN") {
    const { data, error: technicianDetailsError } = await supabase
      .from("technician_details")
      .select("*")
      .eq("id", profile.id)
      .single();

    if (technicianDetailsError) {
      console.error(technicianDetailsError);
    }

    if (data) technicianDetails = data;
  }

  return (
    <div>
      <h1>Account</h1>

      <hr />

      <h2>Profile</h2>

      {Object.entries(profile).map(([key, value]) => (
        <div key={key}>
          <span>{key}</span>
          <span>{value}</span>
        </div>
      ))}

      {technicianDetails ? (
        <>
          <hr />

          <h2>Technician Details</h2>

          {Object.entries(technicianDetails).map(([key, value]) => (
            <div key={key}>
              <span>{key}</span>
              <span>{value}</span>
            </div>
          ))}
        </>
      ) : null}

      <hr />

      <form action="/api/auth/signout" method="post">
        <button type="submit">Sign out</button>
      </form>
    </div>
  );
}
