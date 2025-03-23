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
  return (
    <ul
      ref={timeslotListRef}
      className="inner-shadow mb-6 max-h-72 overflow-y-auto pb-4"
    >
      {filteredSlots.map((slot: Timeslot) => (
        <li
          key={slot.id}
          className="mx-4 my-2 cursor-pointer rounded bg-blue-100 p-2 text-black hover:bg-blue-300"
          onClick={(e) => {
            e.stopPropagation();
            handleSelectSlot(slot);
          }}
        >
          {new Date(slot.start).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
          -{" "}
          {new Date(slot.end).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </li>
      ))}
    </ul>
  );
}
