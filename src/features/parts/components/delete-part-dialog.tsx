"use client";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/ui/button";
import { useDialog } from "@/components/ui/use-dialog";
import { Dialog } from "@/components/ui/dialog";
import { DeletePartForm } from "./delete-part-form";

type DeletePartDialogProps = { partId: string | number };

export const DeletePartDialog = ({ partId }: DeletePartDialogProps) => {
  const { isOpen, closeDialog, openDialog } = useDialog();

  return (
    <>
      <Button
        size="icon"
        variant="destructive"
        onClick={openDialog}
        aria-label="Delete Part"
      >
        <FontAwesomeIcon icon={faTrash} />
      </Button>

      <Dialog title="Delete Part?" isOpen={isOpen} onClose={closeDialog}>
        <DeletePartForm partId={partId} onCancel={closeDialog} />
      </Dialog>
    </>
  );
};
