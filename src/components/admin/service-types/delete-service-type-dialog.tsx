"use client";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/ui/button";
import { useDialog } from "@/components/ui/use-dialog";
import { Dialog } from "@/components/ui/dialog";
import { DeleteServiceTypeForm } from "@/components/admin/service-types/delete-service-type-form";

type UpdateServiceTypeDialogProps = { serviceTypeId: string | number };

export const UpdateServiceTypeDialog = ({
  serviceTypeId,
}: UpdateServiceTypeDialogProps) => {
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
        <DeleteServiceTypeForm
          serviceTypeId={serviceTypeId}
          onCancel={closeDialog}
        />
      </Dialog>
    </>
  );
};
