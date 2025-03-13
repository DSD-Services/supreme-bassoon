"use client";

import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { createServiceTypePartsAction } from "@/features/service-types/actions/create-service-type-parts.action";
import type { Part } from "@/utils/supabase/types";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

type CreateServiceTypePartsFormProps = {
  serviceTypeId: number;
  parts: Array<Part>;
};

export const CreateServiceTypePartsForm = ({
  serviceTypeId,
  parts,
}: CreateServiceTypePartsFormProps) => {
  const [part, setPart] = useState<Part>(parts[0]);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();

    startTransition(async () => {
      const { success } = await createServiceTypePartsAction({
        serviceTypeId,
        partId: part.id,
      });

      if (!success) return;

      router.refresh();
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <Select
        value={part.id}
        onChange={(evt) => {
          const selectedPart = parts.find((d) => d.id === +evt.target.value);
          if (selectedPart) setPart(selectedPart);
        }}
        disabled={isPending}
      >
        {parts.map((d) => (
          <option key={d.id} value={d.id}>
            {d.name}
          </option>
        ))}
      </Select>
      <Button
        size="sm"
        variant="success"
        className="flex items-center"
        disabled={isPending}
      >
        <FontAwesomeIcon icon={faPlus} />
      </Button>
    </form>
  );
};
