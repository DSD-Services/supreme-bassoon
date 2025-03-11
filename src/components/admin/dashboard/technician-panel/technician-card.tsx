"use client";

import { Profile, TechnicianDetail } from "@/utils/supabase/types";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { TechnicianDetailsEditDialog } from "./technician-details-edit-dialog copy";
import { ProfileEditDialog } from "./profile-edit-dialog";
import { Button } from "@/components/kui/button";

type TechnicianCardProps = {
  profile: Profile & {
    technician_details:
      | (TechnicianDetail & { departments: { name: string } | null })
      | null;
  };
};

const formatTime = (time: string) => {
  const [hours, minutes] = time.split(":");
  const date = new Date();
  date.setHours(Number(hours));
  date.setMinutes(Number(minutes));

  return date
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .replace(" ", "")
    .toUpperCase();
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
          <p className="bg-primary text-primary-foreground rounded px-4 py-2 text-sm font-bold">
            {profile.role}
          </p>
          <Button
            size="sm"
            onClick={handleChange}
            className="bg-primary hover:bg-primary/70 text-primary-foreground flex items-center rounded px-2 py-1 font-bold transition"
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
              <ProfileEditDialog profile={profile} />
            </div>
          </div>
          <div className="bg-muted h-0.5" />
          <div className="flex flex-col justify-between sm:flex-row">
            <div>
              <p>
                <strong>Break Start Time</strong>:{" "}
                {profile.technician_details?.break_start_time
                  ? formatTime(profile.technician_details?.break_start_time)
                  : null}
              </p>
              <p>
                <strong>Break End Time</strong>:{" "}
                {profile.technician_details?.break_end_time
                  ? formatTime(profile.technician_details?.break_end_time)
                  : null}
              </p>
              <p>
                <strong>Work Start Time</strong>:{" "}
                {profile.technician_details?.work_start_time
                  ? formatTime(profile.technician_details?.work_start_time)
                  : null}
              </p>
              <p>
                <strong>Work End Time</strong>:{" "}
                {profile.technician_details?.work_end_time
                  ? formatTime(profile.technician_details?.work_end_time)
                  : null}
              </p>
              <div className="flex flex-col justify-between sm:flex-row sm:gap-2">
                <p>
                  <strong>Work Days</strong>:{" "}
                  {profile.technician_details?.work_days?.join(", ")}
                </p>
              </div>
            </div>
            <div>
              <TechnicianDetailsEditDialog
                technicianDetails={profile.technician_details}
              />
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};
