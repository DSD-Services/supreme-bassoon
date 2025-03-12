"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updatePart } from "@/features/parts/action/update.action";
import { cn } from "@/lib/utils";
import { Part } from "@/utils/supabase/types";
import { faCheck, faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

type UpdatePartQuantityFormProps = { part: Part };

export const UpdatePartQuantityForm = ({
  part,
}: UpdatePartQuantityFormProps) => {
  const [editing, setEditing] = useState(false);
  const [quantity, setQuantity] = useState(String(part.quantity));
  const icon = editing ? faCheck : faPencil;
  const router = useRouter();

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    if (!editing) {
      setEditing(true);
      return;
    }

    const { success } = await updatePart(part.id, +quantity);

    if (!success) {
      toast.error("Update failed");
      return;
    }

    toast.success("Update successful");
    setEditing(false);
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <Input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        disabled={!editing}
        className={cn("w-24", {
          "border-none shadow-none": !editing,
        })}
      />
      <Button size="sm" variant="outline" className="flex items-center">
        <FontAwesomeIcon icon={icon} />
      </Button>
    </form>
  );
};
