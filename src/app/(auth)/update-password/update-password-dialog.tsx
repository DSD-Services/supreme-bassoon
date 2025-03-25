"use client";

import { faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/ui/button";
import { useDialog } from "@/components/ui/use-dialog";
import { Dialog } from "@/components/ui/dialog";
import { UpdatePasswordForm } from "./update-password-form";

export const UpdatePasswordDialog = () => {
  const { isOpen, closeDialog, openDialog } = useDialog();

  return (
    <>
      <Button
        className="inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-md bg-red-500 px-4 py-2 text-sm font-medium whitespace-nowrap text-white shadow transition-colors hover:bg-red-800 focus-visible:ring-1 focus-visible:ring-red-800 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
        size="sm"
        variant="secondary"
        onClick={openDialog}
      >
        <FontAwesomeIcon icon={faKey} />
        Change Password
      </Button>

      <Dialog title="Update Password" isOpen={isOpen} onClose={closeDialog}>
        <UpdatePasswordForm onSuccess={closeDialog} />
      </Dialog>
    </>
  );
};
