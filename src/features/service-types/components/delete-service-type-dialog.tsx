"use client";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/ui/button";
import { useDialog } from "@/components/ui/use-dialog";
import { Dialog } from "@/components/ui/dialog";
import { DeleteServiceTypeForm } from "@/features/service-types/components/delete-service-type-form";

type DeleteServiceTypeDialogProps = { serviceTypeId: string | number };

export const DeleteServiceTypeDialog = ({
  serviceTypeId,
}: DeleteServiceTypeDialogProps) => {
  const { isOpen, closeDialog, openDialog } = useDialog();

  return (
    <>
      <Button
        size="icon"
        variant="destructive"
        onClick={openDialog}
        aria-label="Delete Service Type"
      >
        <FontAwesomeIcon icon={faTrash} />
      </Button>

      <Dialog
        title="Delete Service Type?"
        isOpen={isOpen}
        onClose={closeDialog}
      >
        <DeleteServiceTypeForm
          serviceTypeId={serviceTypeId}
          onCancel={closeDialog}
        />
      </Dialog>
    </>
  );
};
