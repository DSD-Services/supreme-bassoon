"use client";

import { TechnicianDetail, UserRole } from "@/utils/supabase/types";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UpdateTechnicianForm } from "./update-technician-form";
import { Button } from "@/components/ui/button";
import { useDialog } from "@/components/ui/use-dialog";
import { Dialog } from "@/components/ui/dialog";

type UpdateTechnicianDialogProps = {
  technicianDetails:
    | (TechnicianDetail & { departments: { name: string } | null })
    | null;
  role: UserRole;
};

export const UpdateTechnicianDialog = ({
  technicianDetails,
  role,
}: UpdateTechnicianDialogProps) => {
  const { isOpen, closeDialog, openDialog } = useDialog();

  return (
    <>
      <Button size="sm" variant="secondary" onClick={openDialog}>
        <FontAwesomeIcon icon={faPencil} />
        Edit
      </Button>

      <Dialog title="Update Technician" isOpen={isOpen} onClose={closeDialog}>
        <UpdateTechnicianForm
          technicianDetails={technicianDetails}
          onSuccess={closeDialog}
          role={role}
        />
      </Dialog>
    </>
  );
};
