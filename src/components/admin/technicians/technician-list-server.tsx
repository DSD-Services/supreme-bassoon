import { findAllProfiles } from "@/features/profiles/queries";
import { TechnicianList } from "@/components/admin/technicians/technician-list";

type TechnicianListServerProps = { initialQuery: string };

export const TechnicianListServer = async ({
  initialQuery,
}: TechnicianListServerProps) => {
  const { data: profiles } = await findAllProfiles({
    role: "TECHNICIAN",
    query: initialQuery,
  });

  return <TechnicianList profiles={profiles ?? []} />;
};
