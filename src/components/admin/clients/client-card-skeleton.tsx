import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ClientCardSkeleton = () => {
  return (
    <div className="flex animate-pulse items-center gap-1">
      <div className="flex-1 rounded border p-4 shadow">
        <div className="flex cursor-pointer list-none items-center justify-between gap-4">
          <p />
          <div className="flex items-center gap-4">
            <span className="flex size-6 items-center justify-center rounded-md px-2 text-xs shadow">
              <FontAwesomeIcon icon={faAngleDown} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
