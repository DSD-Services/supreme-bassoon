import { DateTime } from "luxon";
import { formatDateLong } from "@/lib/utils";
import StepButtons from "./step-buttons";
import { CreateWorkOrderInput } from "@/features/work-orders/schemas";

interface Step3ConfirmDateTimeProps {
  step: number;
  prevStep: () => void;
  nextStep: () => void;
  formValues: CreateWorkOrderInput;
}

export default function Step3ConfirmDateTime({
  step,
  prevStep,
  nextStep,
  formValues,
}: Step3ConfirmDateTimeProps) {
  const timeZone = "America/Denver";

  const formatTime = (date: Date) => {
    return DateTime.fromJSDate(date).setZone(timeZone).toFormat("h:mm a");
  };

  const convertToSetTimeZone = (date: Date) => {
    return DateTime.fromJSDate(date).setZone(timeZone);
  };

  return (
    <div
      aria-current={step === 3 ? "step" : undefined}
      className="-mt-10 flex flex-col items-center justify-center px-2"
    >
      <h2 className="flex pb-2 text-center text-base font-semibold md:text-lg">
        Confirm your selected appointment time:
      </h2>
      {formValues.appointmentStart && formValues.appointmentEnd && (
        <div className="pb-6 text-center">
          <div className="rounded-md bg-white p-4 shadow-lg">
            <span className="block font-semibold text-blue-800">
              Selected Time:
            </span>
            <span className="block text-lg font-medium">
              {formatDateLong(
                convertToSetTimeZone(
                  new Date(formValues.appointmentStart),
                ).toJSDate(),
              )}
            </span>
            <span className="block text-lg font-medium">
              {formatTime(new Date(formValues.appointmentStart))} -{" "}
              {formatTime(new Date(formValues.appointmentEnd))}
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
