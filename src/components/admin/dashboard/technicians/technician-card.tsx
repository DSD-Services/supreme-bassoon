"use client";

import type {
  Department,
  Profile,
  TechnicianDetail,
} from "@/utils/supabase/types";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { UpdateTechnicianDialog } from "./update-technician-dialog";
import { UpdateProfileDialog } from "./update-profile-dialog";
import { Button } from "@/components/ui/button";
import { formatTime } from "@/lib/utils";

type TechnicianCardProps = {
  profile: Profile & {
    technician_details:
      | (TechnicianDetail & { departments: Department | null })
      | null;
  };
};

export const TechnicianCard = ({ profile }: TechnicianCardProps) => {
  const [open, setOpen] = useState(false);
  const handleChange = () => setOpen((prev) => !prev);

  return (
    <div key={profile.id} className="space-y-2 rounded border p-4 shadow">
      <div className="flex items-center justify-between gap-4">
        <p>
          {profile.first_name} {profile.last_name} (
          {profile.technician_details?.departments?.name})
        </p>
        <div className="flex items-center gap-4">
          <p className="rounded bg-blue-500 px-4 py-2 text-sm font-bold text-white">
            {profile.role}
          </p>
          <Button
            size="sm"
            onClick={handleChange}
            className="flex items-center rounded bg-blue-500 px-2 py-1 font-bold text-white transition hover:bg-blue-600"
          >
            {open ? (
              <FontAwesomeIcon icon={faAngleUp} />
            ) : (
              <FontAwesomeIcon icon={faAngleDown} />
            )}
          </Button>
        </div>
      </div>
      {open ? (
        <>
          <div className="bg-muted h-0.5" />
          <ProfileInformation profile={profile} />
          <div className="bg-muted h-0.5" />
          {profile.technician_details ? (
            <TechnicianDetailsInformation
              technicianDetails={profile.technician_details}
            />
          ) : null}
        </>
      ) : null}
    </div>
  );
};

const ProfileInformation = ({ profile }: { profile: Profile }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:gap-4">
      <div className="flex-1">
        <p>
          <strong>Address Line 1</strong>: {profile.address_line1}
        </p>
        <p>
          <strong>Address Line 2</strong>: {profile.address_line2}
        </p>
        <p>
          <strong>City</strong>: {profile.city}
        </p>
        <p>
          <strong>State</strong>: {profile.state}
        </p>
        <p>
          <strong>Postal Code</strong>: {profile.postal_code}
        </p>
      </div>
      <div className="flex-1">
        <p>
          <strong>Primary Phone</strong>: {profile.primary_phone}
        </p>
        <p>
          <strong>Secondary Phone</strong>: {profile.secondary_phone}
        </p>
      </div>
      <div className="justify-self-end">
        <UpdateProfileDialog profile={profile} />
      </div>
    </div>
  );
};

const TechnicianDetailsInformation = ({
  technicianDetails,
}: {
  technicianDetails: TechnicianDetail & { departments: Department | null };
}) => {
  return (
    <div className="flex flex-col justify-between sm:flex-row">
      <div>
        <p>
          <strong>Break Start Time</strong>:{" "}
          {technicianDetails?.break_start_time
            ? formatTime(technicianDetails?.break_start_time)
            : null}
        </p>
        <p>
          <strong>Break End Time</strong>:{" "}
          {technicianDetails?.break_end_time
            ? formatTime(technicianDetails?.break_end_time)
            : null}
        </p>
        <p>
          <strong>Work Start Time</strong>:{" "}
          {technicianDetails?.work_start_time
            ? formatTime(technicianDetails?.work_start_time)
            : null}
        </p>
        <p>
          <strong>Work End Time</strong>:{" "}
          {technicianDetails?.work_end_time
            ? formatTime(technicianDetails?.work_end_time)
            : null}
        </p>
        <div className="flex flex-col justify-between sm:flex-row sm:gap-2">
          <p>
            <strong>Work Days</strong>:{" "}
            {technicianDetails?.work_days?.join(", ")}
          </p>
        </div>
      </div>
      <div>
        <UpdateTechnicianDialog technicianDetails={technicianDetails} />
      </div>
    </div>
  );
};
