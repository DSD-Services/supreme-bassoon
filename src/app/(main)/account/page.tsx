import { notFound } from "next/navigation";
import type { Department, TechnicianDetail } from "@/utils/supabase/types";
import { Button } from "@/components/ui/button";
import { protect } from "@/features/auth/queries";
import { findOneProfile } from "@/features/profiles/queries";
import { findOneTechnicianDetails } from "@/features/technician-details/queries";
import { formatTime } from "@/lib/utils";
import { UpdateProfileDialog } from "@/features/profiles/components/update-profile-dialog";
import { UpdateTechnicianDialog } from "@/features/technician-details/components/update-technician-dialog";

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

  // random number between 0-1
  const random = Math.random();
  if (random < 0.5) {
    throw new Error("Random error for testing purposes");
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <div className="rounded border-2 p-4">
        <h1 className="mb-6 text-center text-3xl font-semibold">Account</h1>

        <div className="flex items-center justify-between gap-2">
          <h2 className="text-2xl font-medium text-gray-700">Profile</h2>
          <UpdateProfileDialog profile={profile} />
        </div>

        <ul className="mt-4 list-none space-y-2 text-gray-600">
          <li>
            <strong>Name:</strong> {profile.first_name} {profile.last_name}
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
          <div className="space-y-4">
            <hr />

            <div className="h-9 w-fit rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium shadow-sm">
              {technicianDetails.departments?.name}
            </div>

            <div className="flex items-center justify-between gap-2">
              <h2 className="text-2xl font-medium text-gray-700">
                Technician Details
              </h2>
              <UpdateTechnicianDialog
                technicianDetails={technicianDetails}
                role={profile.role}
              />
            </div>

            <div className="space-y-4 text-gray-600">
              <p>
                <strong>Work Days: </strong>
                {technicianDetails.work_days
                  ?.map((day) => day.charAt(0) + day.slice(1).toLowerCase())
                  .join(", ")}
              </p>

              <p>
                <strong>Work: </strong>
                <span className="font-semibold">
                  {technicianDetails.work_start_time
                    ? formatTime(technicianDetails.work_start_time)
                    : "-"}{" "}
                  -{" "}
                  {technicianDetails.work_end_time
                    ? formatTime(technicianDetails.work_end_time)
                    : "-"}
                </span>
              </p>

              <p>
                <strong>Break: </strong>
                <span className="font-semibold">
                  {technicianDetails.break_start_time
                    ? formatTime(technicianDetails.break_start_time)
                    : "-"}{" "}
                  -{" "}
                  {technicianDetails.break_end_time
                    ? formatTime(technicianDetails.break_end_time)
                    : "-"}
                </span>
              </p>
            </div>
          </div>
        ) : null}

        <hr className="my-6" />

        <form action="/api/auth/signout" method="post">
          <Button variant="destructive" type="submit" className="w-full">
            Sign out
          </Button>
        </form>
      </div>
    </div>
  );
}
