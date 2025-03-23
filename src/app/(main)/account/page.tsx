import { notFound } from "next/navigation";
import type { Department, TechnicianDetail } from "@/utils/supabase/types";
import { protect } from "@/features/auth/queries";
import { findOneProfile } from "@/features/profiles/queries";
import { findOneTechnicianDetails } from "@/features/technician-details/queries";
import { formatTime } from "@/lib/utils";
import { UpdateProfileDialog } from "@/features/profiles/components/update-profile-dialog";
import { UpdateTechnicianDialog } from "@/features/technician-details/components/update-technician-dialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPhone,
  faCalendarAlt,
  faClock,
  faMugHot,
  faBuilding,
} from "@fortawesome/free-solid-svg-icons";
import { SignOutButton } from "@/features/auth/components/sign-out-button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account",
};

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
    <div className="mx-auto max-w-3xl md:py-12">
      <div className="overflow-hidden bg-white md:rounded-xl md:shadow-lg">
        <div className="bg-blue-500 px-6 py-6">
          <h1 className="text-center text-3xl font-bold text-white">
            My Account
          </h1>
        </div>

        <div className="p-4">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <span className="font-semibold text-blue-600 uppercase">
                  {profile.first_name.substring(0, 2)}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Profile Information
              </h2>
            </div>
            <UpdateProfileDialog profile={profile} />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">Full Name</p>
                  <p className="font-medium text-gray-800">
                    {profile.first_name} {profile.last_name}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="font-medium text-gray-800">{profile.email}</p>
                </div>
              </div>
              <div />
            </div>

            <div className="flex items-start">
              <FontAwesomeIcon
                size="sm"
                icon={faMapMarkerAlt}
                className="mt-0.5 mr-2 h-4 w-4 text-gray-500"
              />
              <div>
                <p className="text-sm font-medium text-gray-500">Address</p>
                {profile.address_line1 ||
                profile.city ||
                profile.state ||
                profile.postal_code ? (
                  <>
                    {profile.address_line1 && (
                      <p className="font-medium text-gray-800">
                        {profile.address_line1}
                        {profile.address_line2
                          ? `, ${profile.address_line2}`
                          : ""}
                      </p>
                    )}
                    {(profile.city || profile.state || profile.postal_code) && (
                      <p className="font-medium text-gray-800">
                        {profile.city}
                        {profile.city && profile.state ? ", " : ""}
                        {profile.state}
                        {(profile.city || profile.state) && profile.postal_code
                          ? " "
                          : ""}
                        {profile.postal_code}
                      </p>
                    )}
                  </>
                ) : (
                  <p className="text-gray-500 italic">Address not provided</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between gap-2">
              <div className="flex">
                <FontAwesomeIcon
                  size="sm"
                  icon={faPhone}
                  className="mt-0.5 mr-2 h-4 w-4 text-gray-500"
                />
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Primary Phone
                  </p>
                  <p className="font-medium text-gray-800">
                    {profile.primary_phone || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="flex">
                <FontAwesomeIcon
                  size="sm"
                  icon={faPhone}
                  className="mt-0.5 mr-2 h-4 w-4 text-gray-500"
                />
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Secondary Phone
                  </p>
                  <p className="font-medium text-gray-800">
                    {profile.secondary_phone || "Not provided"}
                  </p>
                </div>
              </div>

              <div />
            </div>
          </div>
        </div>

        {technicianDetails ? (
          <div className="border-t border-gray-200 p-4">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  <FontAwesomeIcon
                    size="sm"
                    icon={faBuilding}
                    className="h-5 w-5 text-green-600"
                  />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Technician Details
                </h2>
              </div>
              <UpdateTechnicianDialog
                technicianDetails={technicianDetails}
                role={profile.role}
              />
            </div>

            <div className="mb-4 rounded-lg bg-green-50 p-3">
              <div className="flex items-center">
                <FontAwesomeIcon
                  size="sm"
                  icon={faBuilding}
                  className="mr-2 h-4 w-4 text-green-600"
                />
                <span className="font-medium text-green-800">
                  {technicianDetails.departments?.name ||
                    "No Department Assigned"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-gray-200 bg-white p-3">
                <div className="mb-2 flex items-center">
                  <FontAwesomeIcon
                    size="sm"
                    icon={faCalendarAlt}
                    className="mr-2 h-4 w-4 text-gray-600"
                  />
                  <h3 className="font-semibold text-gray-800">Work Days</h3>
                </div>
                <p className="text-gray-700">
                  {technicianDetails.work_days
                    ?.map((day) => day.charAt(0) + day.slice(1).toLowerCase())
                    .join(", ") || "Not scheduled"}
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-3">
                <div className="mb-2 flex items-center">
                  <FontAwesomeIcon
                    size="sm"
                    icon={faClock}
                    className="mr-2 h-4 w-4 text-gray-600"
                  />
                  <h3 className="font-semibold text-gray-800">Work Hours</h3>
                </div>
                <p className="text-gray-700">
                  {technicianDetails.work_start_time
                    ? formatTime(technicianDetails.work_start_time)
                    : "-"}{" "}
                  -{" "}
                  {technicianDetails.work_end_time
                    ? formatTime(technicianDetails.work_end_time)
                    : "-"}
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-3">
                <div className="mb-2 flex items-center">
                  <FontAwesomeIcon
                    size="sm"
                    icon={faMugHot}
                    className="mr-2 h-4 w-4 text-gray-600"
                  />
                  <h3 className="font-semibold text-gray-800">Break Time</h3>
                </div>
                <p className="text-gray-700">
                  {technicianDetails.break_start_time
                    ? formatTime(technicianDetails.break_start_time)
                    : "-"}{" "}
                  -{" "}
                  {technicianDetails.break_end_time
                    ? formatTime(technicianDetails.break_end_time)
                    : "-"}
                </p>
              </div>
            </div>
          </div>
        ) : null}

        <div className="flex justify-end border-t border-gray-200 p-4">
          <SignOutButton />
        </div>
      </div>
    </div>
  );
}
