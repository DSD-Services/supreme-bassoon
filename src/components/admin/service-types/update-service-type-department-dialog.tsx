"use client";

import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/ui/button";
import { useDialog } from "@/components/ui/use-dialog";
import { Dialog } from "@/components/ui/dialog";
import type {
  Department,
  DepartmentServiceType,
  ServiceType,
} from "@/utils/supabase/types";
import { UpdateServiceTypeDepartmentForm } from "./update-service-type-department-form";

type UpdateServiceTypeDepartmentDialogProps = {
  serviceType: ServiceType & {
    department_service_types:
      | (DepartmentServiceType & {
          departments: Department;
        })
      | null;
  };
  departments: Array<Department>;
};

export const UpdateServiceTypeDepartmentDialog = ({
  serviceType,
  departments,
}: UpdateServiceTypeDepartmentDialogProps) => {
  const { isOpen, closeDialog, openDialog } = useDialog();

  return (
    <>
      <Button
        size="sm"
        variant={
          serviceType.department_service_types?.departments.name
            ? "warning"
            : "destructive"
        }
        onClick={openDialog}
        className="w-full"
        aria-label="Update Department"
      >
        {serviceType.department_service_types?.departments.name ?? "Unassigned"}
        <FontAwesomeIcon icon={faPencil} />
      </Button>

      <Dialog title="Update Department" isOpen={isOpen} onClose={closeDialog}>
        <UpdateServiceTypeDepartmentForm
          serviceType={serviceType}
          departments={departments}
          onCancel={closeDialog}
        />
      </Dialog>
    </>
  );
};
