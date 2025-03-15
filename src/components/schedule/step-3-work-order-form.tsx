import { formatDateLong } from "@/lib/utils";
import StepButtons from "./step-buttons";
import { Timeslot } from "@/lib/types/work-order-types";

interface Step3ConfirmDateTimeProps {
  selectedSlot: Timeslot | null;
  prevStep: () => void;
  nextStep: () => void;
}

export default function Step3ConfirmDateTime({
  selectedSlot,
  prevStep,
  nextStep,
}: Step3ConfirmDateTimeProps) {
  return (
    <div className="flex flex-col items-center justify-center px-2">
      <h2 className="flex pb-2 text-center text-lg font-semibold">
        Step 3: Confirm selected appointment time:
      </h2>
      {selectedSlot && (
        <div className="pb-6 text-center">
          <div className="rounded-md bg-white p-4">
            <span className="block font-semibold text-blue-800">
              Selected Time:
            </span>
            <span className="block text-lg font-medium">
              {formatDateLong(new Date(selectedSlot.start))}
            </span>
            <span className="block text-lg font-medium">
              {new Date(selectedSlot.start).toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}{" "}
              -{" "}
              {new Date(selectedSlot.end).toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}
            </span>
          </div>
          <p className="pt-4 italic">
            If the date and time above look correct, please proceed to the next
            step.
          </p>
          <p className="italic">
            If not, please go back and select a different date or time.
          </p>
        </div>
      )}
      <StepButtons variant="prevNext" prevStep={prevStep} nextStep={nextStep} />
    </div>
  );
}
