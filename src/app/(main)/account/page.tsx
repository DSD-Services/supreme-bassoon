import { notFound } from "next/navigation";
import type { Department, TechnicianDetail } from "@/utils/supabase/types";
import { Button } from "@/components/ui/button";
import { protect } from "@/features/auth/queries";
import { findOneProfile } from "@/features/profiles/queries";
import { findOneTechnicianDetails } from "@/features/technician-details/queries";

export default async function Page() {
  const { userId } = await protect({ action: "redirect" });

  const { data: profile } = await findOneProfile(userId);
  if (!profile) notFound();

  let technicianDetails:
    | (TechnicianDetail & { departments: Department | null })
    | null = null;

  if (profile.role === "TECHNICIAN") {
    const { data } = await findOneTechnicianDetails(userId);
    technicianDetails = data;
  }

  return (
    <div className="mx-auto my-8 max-w-3xl border-2 p-6 font-sans">
      <h1 className="mb-6 text-center text-3xl font-semibold">Account</h1>

      <h2 className="text-2xl font-medium text-gray-700">Profile</h2>

      <ul className="mt-4 list-none space-y-2 text-gray-600">
        <li>
          <strong>First Name:</strong> {profile.first_name}
        </li>
        <li>
          <strong>Last Name:</strong> {profile.last_name}
        </li>
        <li>
          <strong className="text-gray-600">Address:</strong>{" "}
          {profile.address_line1}, {profile.address_line2}, {profile.city},{" "}
          {profile.state}, {profile.postal_code}
        </li>
        <li>
          <strong>Primary Phone:</strong> {profile.primary_phone}
        </li>
        <li>
          <strong>Secondary Phone:</strong> {profile.secondary_phone}
        </li>
      </ul>

      {technicianDetails ? (
        <>
          <hr className="my-6" />

          <h2 className="text-2xl font-medium text-gray-700">
            Technician Details
          </h2>

          <ul className="mt-4 list-none space-y-4 text-gray-600">
            <li>
              <strong>Work Days: </strong>
              {typeof technicianDetails.work_days === "string"
                ? technicianDetails.work_days
                    .match(
                      /(MONDAY|TUESDAY|WEDNESDAY|THURSDAY|FRIDAY|SATURDAY|SUNDAY)/gi,
                    )
                    ?.map((day) => day.charAt(0) + day.slice(1).toLowerCase())
                    .join(", ") || technicianDetails.work_days
                : Array.isArray(technicianDetails.work_days)
                  ? technicianDetails.work_days
                      .map((day) => day.charAt(0) + day.slice(1).toLowerCase())
                      .join(", ")
                  : technicianDetails.work_days}
            </li>

            <li>
              <strong>Time: </strong>
              {technicianDetails.work_start_time} -{" "}
              {technicianDetails.break_start_time} /
              {technicianDetails.break_end_time} -{" "}
              {technicianDetails.work_end_time}
            </li>
          </ul>
        </>
      ) : null}

      <hr className="my-6" />

      <form action="/api/auth/signout" method="post">
        <Button variant="destructive" type="submit" className="w-full">
          Sign out
        </Button>
      </form>
    </div>
  );
}
