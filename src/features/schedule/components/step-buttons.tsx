import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";

interface StepButtonProps {
  variant: "prevOnly" | "prevNext" | "nextOnly";
  prevStep?: () => void;
  nextStep?: () => void;
  isBackDisabled?: boolean;
  isNextDisabled?: boolean;
}

export default function StepButtons({
  variant,
  prevStep,
  nextStep,
  isBackDisabled,
  isNextDisabled,
}: StepButtonProps) {
  return (
    <div className="flex justify-between gap-10">
      {(variant === "prevOnly" || variant === "prevNext") && (
        <Button
          type="button"
          onClick={prevStep}
          variant="default"
          disabled={isBackDisabled}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Back
        </Button>
      )}
      {(variant === "nextOnly" || variant === "prevNext") && (
        <Button
          type="button"
          onClick={nextStep}
          variant="default"
          disabled={isNextDisabled}
        >
          Next
          <FontAwesomeIcon icon={faArrowRight} />
        </Button>
      )}
    </div>
  );
}
