import { Button } from "@/components/ui/button";
import { deleteServiceTypeAction } from "@/features/service-types/actions/delete-service-type.action";
import { useTransition } from "react";
import toast from "react-hot-toast";

type DeleteServiceTypeFormProps = {
  serviceTypeId: string | number;
  onCancel: () => void;
};

export const DeleteServiceTypeForm = ({
  serviceTypeId,
  onCancel,
}: DeleteServiceTypeFormProps) => {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      await deleteServiceTypeAction(serviceTypeId);
      onCancel();
      toast.success("Delete successful");
    });
  };

  return (
    <div className="flex justify-end gap-2">
      <Button
        size="sm"
        variant="secondary"
        className="w-16"
        onClick={() => onCancel()}
        disabled={isPending}
      >
        No
      </Button>
      <Button
        size="sm"
        variant="destructive"
        className="w-16"
        onClick={handleClick}
        disabled={isPending}
      >
        Yes
      </Button>
    </div>
  );
};
