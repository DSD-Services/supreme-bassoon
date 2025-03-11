import { createClient } from "@/utils/supabase/server";
import { notFound, redirect } from "next/navigation";
import type { Department, TechnicianDetail } from "@/utils/supabase/types";
import { Button } from "@/components/kui/button";

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

  let technicianDetails:
    | (TechnicianDetail & { departments: Pick<Department, "name"> | null })
    | null = null;
  if (profile.role === "TECHNICIAN") {
    const { data, error: technicianDetailsError } = await supabase
      .from("technician_details")
      .select("*, departments(name)")
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

      <ul>
        <li>
          <strong>id:</strong> {profile.id}
        </li>
        <li>
          <strong>created_at:</strong> {profile.created_at}
        </li>
        <li>
          <strong>updated_at:</strong> {profile.updated_at}
        </li>
        <li>
          <strong>role:</strong> {profile.role}
        </li>
        <li>
          <strong>first_name:</strong> {profile.first_name}
        </li>
        <li>
          <strong>last_name:</strong> {profile.last_name}
        </li>
        <li>
          <strong>address_line1:</strong> {profile.address_line1}
        </li>
        <li>
          <strong>address_line2:</strong> {profile.address_line2}
        </li>
        <li>
          <strong>city:</strong> {profile.city}
        </li>
        <li>
          <strong>state:</strong> {profile.state}
        </li>
        <li>
          <strong>postal_code:</strong> {profile.postal_code}
        </li>
        <li>
          <strong>primary_phone:</strong> {profile.primary_phone}
        </li>
        <li>
          <strong>secondary_phone:</strong> {profile.secondary_phone}
        </li>
      </ul>

      {technicianDetails ? (
        <>
          <hr />

          <h2>Technician Details</h2>

          <ul>
            <li>
              <strong>id:</strong> {technicianDetails.id}
            </li>
            <li>
              <strong>created_at:</strong> {technicianDetails.created_at}
            </li>
            <li>
              <strong>updated_at:</strong> {technicianDetails.updated_at}
            </li>
            <li>
              <strong>work_start_time:</strong>{" "}
              {technicianDetails.work_start_time}
            </li>
            <li>
              <strong>work_end_time:</strong> {technicianDetails.work_end_time}
            </li>
            <li>
              <strong>work_days:</strong> {technicianDetails.work_days}
            </li>
            <li>
              <strong>break_start_time:</strong>{" "}
              {technicianDetails.break_start_time}
            </li>
            <li>
              <strong>break_end_time:</strong>{" "}
              {technicianDetails.break_end_time}
            </li>
            <li>
              <strong>department_id:</strong> {technicianDetails.department_id}
            </li>
            <li>
              <strong>departments:</strong>{" "}
              {technicianDetails.departments?.name}
            </li>
          </ul>
        </>
      ) : null}

      <hr />

      <form action="/api/auth/signout" method="post">
        <Button variant="destructive" type="submit">
          Sign out
        </Button>
      </form>
    </div>
  );
}
