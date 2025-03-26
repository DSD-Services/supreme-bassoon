"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateServiceTypePartsAction } from "@/features/service-types/actions/update-service-type-parts.action";
import { cn } from "@/lib/utils";
import type { Part, ServiceTypePart } from "@/utils/supabase/types";
import { faCheck, faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

type UpdateServiceTypePartsFormProps = {
  serviceTypePart: ServiceTypePart & { parts: Part };
  serviceTypeId: number;
};

export const UpdateServiceTypePartsForm = ({
  serviceTypePart,
  serviceTypeId,
}: UpdateServiceTypePartsFormProps) => {
  const [editing, setEditing] = useState(false);
  const [quantity, setQuantity] = useState(String(serviceTypePart.quantity));
  const icon = editing ? faCheck : faPencil;
  const router = useRouter();

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    if (!editing) {
      setEditing(true);
      return;
    }

    if (serviceTypePart.quantity === +quantity) {
      setEditing(false);
      return;
    }

    const { success } = await updateServiceTypePartsAction({
      serviceTypeId,
      partId: serviceTypePart.part_id,
      quantity: +quantity,
    });

    if (!success) {
      toast.error("Update failed");
      return;
    }

    toast.success("Update successful");
    setEditing(false);
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <Input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        disabled={!editing}
        className={cn("max-w-16 min-w-12", {
          "border-none shadow-none": !editing,
        })}
      />
      <Button size="icon" variant="ghost" className="flex size-4 items-center">
        <FontAwesomeIcon icon={icon} size="sm" />
      </Button>
    </form>
  );
};
