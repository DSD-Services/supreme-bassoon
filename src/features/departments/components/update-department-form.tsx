"use client";

import { Input } from "@/components/ui/input";
import { updateDepartmentAction } from "@/features/departments/actions/update-department.action";
import type { Department } from "@/utils/supabase/types";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";

type UpdateDepartmentFormProps = { department: Department };

export const UpdateDepartmentForm = ({
  department,
}: UpdateDepartmentFormProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleUpdate = (
    evt:
      | React.FocusEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLInputElement>,
  ) => {
    {
      const name = evt.currentTarget.value.trim();
      if (!name || name === department.name) return;

      startTransition(async () => {
        const { success } = await updateDepartmentAction(department.id, name);

        if (!success) {
          toast.error("Update failed");
          return;
        }

        toast.success("Update successful");
        router.refresh();
      });
    }
  };

  return (
    <Input
      defaultValue={department.name}
      disabled={isPending}
      onBlur={handleUpdate}
      onKeyDown={(evt) => evt.key === "Enter" && handleUpdate(evt)}
      className="border-none shadow-none"
    />
  );
};
