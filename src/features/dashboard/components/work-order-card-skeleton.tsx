import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

export const WorkOrderCardSkeleton = () => {
  return (
    <div className="bg-background w-full max-w-[1050px] gap-2 rounded-md p-4 shadow-lg sm:pr-10 md:pr-4">
      <div className="flex flex-row justify-between">
        <div className="flex w-full flex-col md:flex-row">
          <div className="mr-4 flex md:mr-0">
            <div className="mr-2 w-1/2 md:mr-4 md:w-1/3 md:min-w-[150px] lg:mr-10 lg:w-1/2 lg:min-w-[220px]">
              <div className="mb-1 text-xs font-semibold text-gray-500">
                Date &amp; Time
              </div>
              <div className="h-5 w-full animate-pulse rounded bg-gray-200"></div>
            </div>
            <div className="w-1/2 flex-grow md:mr-2 md:w-1/3 md:min-w-[220px] lg:mr-10 lg:w-1/2 lg:min-w-[290px]">
              <div className="mb-1 text-xs font-semibold text-gray-500">
                Service Dept. &amp; Type
              </div>
              <div className="h-5 w-full animate-pulse rounded bg-gray-200"></div>
            </div>
          </div>
          <div className="mt-3 mr-4 flex flex-grow flex-row md:mt-0 md:mr-4 md:flex-wrap lg:flex-row">
            <div className="mr-1 w-1/2 md:mr-4 md:mb-3 md:w-full md:max-w-[100px] lg:mr-16">
              <div className="mb-1 text-xs font-semibold text-gray-500">
                Technician
              </div>
              <div className="h-5 w-full animate-pulse rounded bg-gray-200"></div>
            </div>
            <div className="flex w-1/2 sm:w-1/3 md:w-1/2">
              <div>
                <div className="mb-1 text-xs font-semibold text-gray-500">
                  Status
                </div>
                <div className="h-5 w-20 animate-pulse rounded bg-gray-200"></div>
              </div>
              <div className="mt-4 ml-2 h-5 w-5 animate-pulse rounded-full bg-gray-200"></div>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <span className="ml-auto cursor-pointer pr-2 text-right text-xl font-medium text-gray-400 sm:pl-4">
            <span
              style={{
                display: "inline-block",
                transform: "rotate(0deg)",
                transition: "transform 0.3s ease-in-out",
              }}
            >
              <FontAwesomeIcon icon={faAngleDown} />
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};
