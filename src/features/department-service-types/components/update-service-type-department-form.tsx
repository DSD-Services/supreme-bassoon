import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { updateServiceTypeDepartmentAction } from "@/features/department-service-types/actions/update-service-type-department.action";
import type {
  Department,
  DepartmentServiceType,
  ServiceType,
} from "@/utils/supabase/types";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";

type UpdateServiceTypeDepartmentFormProps = {
  departments: Array<Department>;
  serviceType: ServiceType & {
    department_service_types:
      | (DepartmentServiceType & {
          departments: Department;
        })
      | null;
  };
  onCancel: () => void;
};

export const UpdateServiceTypeDepartmentForm = ({
  departments,
  serviceType,
  onCancel,
}: UpdateServiceTypeDepartmentFormProps) => {
  const [department, setDepartment] = useState<Department | null>(
    serviceType.department_service_types?.departments ?? null,
  );
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();

    if (
      !department ||
      department?.id === serviceType.department_service_types?.departments.id
    ) {
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
        value={department?.id}
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
