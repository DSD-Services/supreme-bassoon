import { findAllParts } from "@/features/parts/queries";
import { PartList } from "@/features/parts/components/part-list";

type PartListServerProps = { initialQuery: string };

export const PartListServer = async ({ initialQuery }: PartListServerProps) => {
  const { data: parts } = await findAllParts({ query: initialQuery });

  return <PartList parts={parts ?? []} />;
};
