"use client";

import { Input } from "@/components/ui/input";
import { updateServiceTypeAction } from "@/features/service-types/actions/update-service-type.action";
import type { ServiceType } from "@/utils/supabase/types";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";

type UpdateServiceTypeFormProps = { serviceType: ServiceType };

export const UpdateServiceTypeForm = ({
  serviceType,
}: UpdateServiceTypeFormProps) => {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const handleUpdate = (
    evt:
      | React.FocusEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLInputElement>,
  ) => {
    {
      const name = evt.currentTarget.value.trim();
      if (!name || name === serviceType.name) return;

      startTransition(async () => {
        const { success } = await updateServiceTypeAction(serviceType.id, name);

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
      defaultValue={serviceType.name}
      disabled={isPending}
      onBlur={handleUpdate}
      onKeyDown={(evt) => evt.key === "Enter" && handleUpdate(evt)}
      className="border-none shadow-none"
    />
  );
};
