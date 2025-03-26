import { TechnicianCardSkeleton } from "./technician-card-skeleton";

export const TechnicianListSkeleton = () => {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <TechnicianCardSkeleton key={index} />
      ))}
    </>
  );
};
