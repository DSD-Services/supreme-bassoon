"use client";

import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/ui/button";
import { useDialog } from "@/components/ui/use-dialog";
import { Dialog } from "@/components/ui/dialog";
import type { Department, ServiceType } from "@/utils/supabase/types";
import { UpdateServiceTypeDepartmentForm } from "./update-service-type-department-form";

type UpdateServiceTypeDepartmentDialogProps = {
  serviceType: ServiceType & { departments: Array<Department> };
  departments: Array<Department>;
};

export const UpdateServiceTypeDepartmentDialog = ({
  serviceType,
  departments,
}: UpdateServiceTypeDepartmentDialogProps) => {
  const { isOpen, closeDialog, openDialog } = useDialog();

  const serviceTypeDepartment = serviceType.departments?.[0];

  return (
    <>
      <Button
        size="sm"
        variant={serviceTypeDepartment?.name ? "warning" : "destructive"}
        onClick={openDialog}
        className="w-full"
        aria-label="Update Department"
      >
        {serviceTypeDepartment?.name ?? "No Department"}
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
