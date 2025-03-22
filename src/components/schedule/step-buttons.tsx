import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";

interface StepButtonProps {
  variant: "prevOnly" | "prevNext" | "nextOnly";
  prevStep?: () => void;
  nextStep?: () => void;
}

export default function StepButtons({
  variant,
  prevStep,
  nextStep,
}: StepButtonProps) {
  return (
    <div className="flex justify-between gap-10">
      {(variant === "prevOnly" || variant === "prevNext") && (
        <Button type="button" onClick={prevStep} variant="default">
          <FontAwesomeIcon icon={faArrowLeft} />
          Back
        </Button>
      )}
      {(variant === "nextOnly" || variant === "prevNext") && (
        <Button type="button" onClick={nextStep} variant="default">
          Next
          <FontAwesomeIcon icon={faArrowRight} />
        </Button>
      )}
    </div>
  );
}
