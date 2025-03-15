"use client";

import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { updateServiceTypeDepartmentAction } from "@/features/service-types/actions/update-service-type-department.action";
import type { Department, ServiceType } from "@/utils/supabase/types";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import toast from "react-hot-toast";

type UpdateServiceTypeDepartmentFormProps = {
  departments: Array<Department>;
  serviceType: ServiceType & { departments: Array<Department> };
  onCancel: () => void;
};

export const UpdateServiceTypeDepartmentForm = ({
  departments,
  serviceType,
  onCancel,
}: UpdateServiceTypeDepartmentFormProps) => {
  const [department, setDepartment] = useState<Department>(
    serviceType.departments[0],
  );
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();

    if (department.id === serviceType.departments[0].id) {
      onCancel();
      return;
    }

    startTransition(async () => {
      const { success } = await updateServiceTypeDepartmentAction(
        serviceType.id,
        department.id,
      );

      if (!success) {
        toast.error("Update failed");
        return;
      }

      toast.success("Update successful");
      onCancel();
      router.refresh();
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <Select
        value={department.id}
        onChange={(evt) => {
          const selectedDepartment = departments.find(
            (d) => d.id === +evt.target.value,
          );
          if (selectedDepartment) setDepartment(selectedDepartment);
        }}
      >
        {departments.map((d) => (
          <option key={d.id} value={d.id}>
            {d.name}
          </option>
        ))}
      </Select>
      <Button
        size="sm"
        variant="outline"
        className="flex items-center"
        disabled={isPending}
      >
        <FontAwesomeIcon icon={faCheck} />
      </Button>
    </form>
  );
};
