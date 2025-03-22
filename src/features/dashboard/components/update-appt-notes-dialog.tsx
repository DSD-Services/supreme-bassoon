"use client";

import type { HydratedWorkOrder } from "@/utils/supabase/types";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/ui/button";
import { useDialog } from "@/components/ui/use-dialog";
import { Dialog } from "@/components/ui/dialog";
import { UpdateApptNotesForm } from "./update-appt-notes-form";

type UpdateApptNotesDialogProps = { workOrder: HydratedWorkOrder };

export const UpdateApptNotesDialog = ({
  workOrder,
}: UpdateApptNotesDialogProps) => {
  const { isOpen, closeDialog, openDialog } = useDialog();

  return (
    <>
      <Button
        size="sm"
        variant="secondary"
        className="bg-blue-100"
        onClick={openDialog}
      >
        <FontAwesomeIcon icon={faPencil} />
        Edit
      </Button>

      <Dialog
        title="Update Appointment Notes"
        isOpen={isOpen}
        onClose={closeDialog}
      >
        <UpdateApptNotesForm workOrder={workOrder} onSuccess={closeDialog} />
      </Dialog>
    </>
  );
};
