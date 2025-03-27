import { ClientCardSkeleton } from "@/components/admin/clients/client-card-skeleton";

export const ClientListSkeleton = () => {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <ClientCardSkeleton key={index} />
      ))}
    </>
  );
};
