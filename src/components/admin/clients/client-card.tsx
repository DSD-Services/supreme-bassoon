import type { Profile } from "@/utils/supabase/types";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UpdateProfileDialog } from "@/features/profiles/components/update-profile-dialog";
import { DeleteUserDialog } from "@/features/users/components/delete-user-dialog";

type ClientCardProps = { profile: Profile };

export const ClientCard = ({ profile }: ClientCardProps) => {
  return (
    <div className="flex items-center gap-1">
      <details className="group flex-1 rounded border p-4 shadow">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
          <p>
            {profile.last_name}, {profile.first_name}
          </p>
          <div className="flex items-center gap-4">
            <span className="flex size-6 items-center justify-center rounded-md bg-blue-500 px-2 text-xs text-white shadow group-open:rotate-180 hover:bg-blue-600">
              <FontAwesomeIcon icon={faAngleDown} />
            </span>
          </div>
        </summary>
        <div className="pt-2">
          <div className="mb-2 h-0.5 bg-gray-200" />
          <ProfileInformation profile={profile} />
        </div>
      </details>
      <div className="self-start">
        <DeleteUserDialog userId={profile.id} />
      </div>
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
