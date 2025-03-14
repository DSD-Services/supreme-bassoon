"use client";

import { Button } from "@/components/ui/button";
import { deleteDepartmentAction } from "@/features/departments/actions/delete-department.action";
import { useTransition } from "react";
import toast from "react-hot-toast";

type DeleteDepartmentFormProps = {
  departmentId: string | number;
  onCancel: () => void;
};

export const DeleteDepartmentForm = ({
  departmentId,
  onCancel,
}: DeleteDepartmentFormProps) => {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      await deleteDepartmentAction(departmentId);
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
