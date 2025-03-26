import { ProfileWithTechnicianDetails } from "@/utils/supabase/types";
import { TechnicianCard } from "@/components/admin/technicians/technician-card";

type TechnicianListProps = {
  profiles: Array<ProfileWithTechnicianDetails>;
};

export const TechnicianList = ({ profiles }: TechnicianListProps) => {
  return (
    <>
      {profiles?.map((profile) => (
        <TechnicianCard key={profile.id} profile={profile} />
      ))}
    </>
  );
};
