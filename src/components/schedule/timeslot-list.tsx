import { DateTime } from "luxon";
import { Timeslot } from "@/lib/types/work-order-types";

interface TimeslotListProps {
  timeslotListRef: React.RefObject<HTMLUListElement> | null;
  filteredSlots: Timeslot[];
  handleSelectSlot: (slot: Timeslot) => void;
}

export default function TimeslotList({
  timeslotListRef,
  filteredSlots,
  handleSelectSlot,
}: TimeslotListProps) {
  const timeZone = "America/Denver";

  return (
    <ul
      ref={timeslotListRef}
      className="inner-shadow mb-6 max-h-72 overflow-y-auto pb-4"
    >
      {filteredSlots.map((slot: Timeslot) => {
        const startTime = DateTime.fromISO(slot.start).setZone(timeZone);
        const endTime = DateTime.fromISO(slot.end).setZone(timeZone);

        return (
          <li
            key={slot.id}
            role="button"
            tabIndex={0}
            className="mx-4 my-2 cursor-pointer rounded bg-blue-100 p-2 text-black hover:bg-blue-300"
            onClick={(e) => {
              e.stopPropagation();
              handleSelectSlot(slot);
            }}
            onKeyDown={(e) => e.key === "Enter" && handleSelectSlot(slot)}
          >
            {startTime.toFormat("h:mm a")} - {endTime.toFormat("h:mm a")}
          </li>
        );
      })}
    </ul>
  );
}
