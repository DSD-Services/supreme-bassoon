"use client";

import { Button } from "@/components/ui/button";
import { deletePartAction } from "@/features/parts/action/delete-part.action";
import { useTransition } from "react";
import toast from "react-hot-toast";

type DeletePartFormProps = { partId: string | number; onCancel: () => void };

export const DeletePartForm = ({ partId, onCancel }: DeletePartFormProps) => {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      await deletePartAction(partId);
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
