import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

interface StepButtonProps {
  type: "prevOnly" | "prevNext" | "nextOnly";
  prevStep?: () => void;
  nextStep?: () => void;
}

export default function StepButtons({
  type,
  prevStep,
  nextStep,
}: StepButtonProps) {
  return (
    <div className="flex justify-center gap-10 pt-10">
      {(type === "prevOnly" || type === "prevNext") && (
        <button
          type="button"
          onClick={prevStep}
          className="bg-primary text-primary-foreground hover:bg-primary/80 cursor-pointer rounded-md px-3 py-2 text-base font-semibold shadow-lg transition"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="pr-3" />
          Back
        </button>
      )}
      {(type === "nextOnly" || type === "prevNext") && (
        <button
          type="button"
          onClick={nextStep}
          className="bg-primary text-primary-foreground hover:bg-primary/80 cursor-pointer rounded-md px-3 py-2 text-base font-semibold shadow-lg transition"
        >
          Next
          <FontAwesomeIcon icon={faArrowRight} className="pl-3" />
        </button>
      )}
    </div>
  );
}
