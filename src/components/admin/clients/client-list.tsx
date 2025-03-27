import { Profile } from "@/utils/supabase/types";
import { ClientCard } from "@/components/admin/clients/client-card";

type ClientListProps = { profiles: Array<Profile> };

export const ClientList = ({ profiles }: ClientListProps) => {
  return (
    <>
      {profiles?.map((profile) => (
        <ClientCard key={profile.id} profile={profile} />
      ))}
    </>
  );
};
