"use client";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/ui/button";
import { useDialog } from "@/components/ui/use-dialog";
import { Dialog } from "@/components/ui/dialog";
import { DeleteDepartmentForm } from "@/features/departments/components/delete-department-form";

type DeleteDepartmentDialogProps = { departmentId: string | number };

export const DeleteDepartmentDialog = ({
  departmentId,
}: DeleteDepartmentDialogProps) => {
  const { isOpen, closeDialog, openDialog } = useDialog();

  return (
    <>
      <Button
        size="sm"
        variant="destructive"
        onClick={openDialog}
        aria-label="Delete Part"
      >
        <FontAwesomeIcon icon={faTrash} />
      </Button>

      <Dialog title="Delete Department?" isOpen={isOpen} onClose={closeDialog}>
        <DeleteDepartmentForm
          departmentId={departmentId}
          onCancel={closeDialog}
        />
      </Dialog>
    </>
  );
};
