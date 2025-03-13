"use client";

import type { Profile } from "@/utils/supabase/types";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/ui/button";
import { useDialog } from "@/components/ui/use-dialog";
import { Dialog } from "@/components/ui/dialog";
import { UpdateProfileForm } from "./update-profile-form";

type UpdateProfileDialogProps = { profile: Profile };

export const UpdateProfileDialog = ({ profile }: UpdateProfileDialogProps) => {
  const { isOpen, closeDialog, openDialog } = useDialog();

  return (
    <>
      <Button size="sm" variant="secondary" onClick={openDialog}>
        <FontAwesomeIcon icon={faPencil} />
        Edit
      </Button>

      <Dialog title="Update Profile" isOpen={isOpen} onClose={closeDialog}>
        <UpdateProfileForm profile={profile} onSuccess={closeDialog} />
      </Dialog>
    </>
  );
};
