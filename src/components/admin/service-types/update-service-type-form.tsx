"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateServiceTypeAction } from "@/features/service-types/actions/update-service-type.action";
import { cn } from "@/lib/utils";
import type { ServiceType } from "@/utils/supabase/types";
import { faCheck, faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

type UpdateServiceTypeFormProps = { serviceType: ServiceType };

export const UpdateServiceTypeForm = ({
  serviceType,
}: UpdateServiceTypeFormProps) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(serviceType.name);
  const icon = editing ? faCheck : faPencil;
  const router = useRouter();

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    if (!editing) {
      setEditing(true);
      return;
    }

    if (name === serviceType.name) {
      setEditing(false);
      return;
    }

    const { success } = await updateServiceTypeAction(serviceType.id, name);

    if (!success) {
      toast.error("Update failed");
      return;
    }

    toast.success("Update successful");
    setEditing(false);
    router.refresh();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full items-center justify-between gap-2"
    >
      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={!editing}
        className={cn("w-32", {
          "border-none shadow-none": !editing,
        })}
      />
      <Button size="sm" variant="outline" className="flex items-center">
        <FontAwesomeIcon icon={icon} />
      </Button>
    </form>
  );
};
