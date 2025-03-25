import { findAllProfiles } from "@/features/profiles/queries";
import { ClientList } from "./client-list";

type ClientListServerProps = { initialQuery: string };

export const ClientListServer = async ({
  initialQuery,
}: ClientListServerProps) => {
  const { data: profiles } = await findAllProfiles({
    role: "CLIENT",
    query: initialQuery,
  });

  return <ClientList profiles={profiles ?? []} />;
};
