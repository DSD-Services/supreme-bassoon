import { WorkOrderCardSkeleton } from "./work-order-card-skeleton";

export const WorkOrdedListSkeleton = () => {
  return (
    <div className="m-0 flex flex-col items-center gap-2 rounded-none bg-blue-50 p-3 text-xs sm:gap-3 md:rounded-lg">
      <h3 className="h-7 w-full max-w-72 animate-pulse bg-blue-800/20 text-lg font-bold"></h3>
      {[...Array(5)].map((_, index) => (
        <WorkOrderCardSkeleton key={index} />
      ))}
    </div>
  );
};
