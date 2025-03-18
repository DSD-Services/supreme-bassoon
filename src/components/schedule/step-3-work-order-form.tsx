import { formatDateLong } from "@/lib/utils";
import StepButtons from "./step-buttons";
import { CreateWorkOrderInput } from "@/features/work-orders/schemas";

interface Step3ConfirmDateTimeProps {
  prevStep: () => void;
  nextStep: () => void;
  formValues: CreateWorkOrderInput;
}

export default function Step3ConfirmDateTime({
  prevStep,
  nextStep,
  formValues,
}: Step3ConfirmDateTimeProps) {
  return (
    <div className="-mt-10 flex flex-col items-center justify-center px-2">
      <h2 className="flex pb-2 text-center text-lg font-semibold">
        Step 3: Confirm selected appointment time:
      </h2>
      {formValues.appointmentStart && formValues.appointmentEnd && (
        <div className="pb-6 text-center">
          <div className="rounded-md bg-white p-4 shadow-lg">
            <span className="block font-semibold text-blue-800">
              Selected Time:
            </span>
            <span className="block text-lg font-medium">
              {formatDateLong(new Date(formValues.appointmentStart))}
            </span>
            <span className="block text-lg font-medium">
              {new Date(formValues.appointmentStart).toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}{" "}
              -{" "}
              {new Date(formValues.appointmentEnd).toLocaleTimeString([], {
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
