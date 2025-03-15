import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { SubmitHandler } from "react-hook-form";
import { FormState } from "./form-state";

interface SubmitButtonProps {
  handleSubmit: (
    onSubmit: SubmitHandler<FormState>,
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  onSubmit: SubmitHandler<FormState>;
}

export default function SubmitButton({
  handleSubmit,
  onSubmit,
}: SubmitButtonProps) {
  return (
    <Button type="submit" onClick={handleSubmit(onSubmit)}>
      Submit <FontAwesomeIcon icon={faCircleCheck} />
    </Button>
  );
}
