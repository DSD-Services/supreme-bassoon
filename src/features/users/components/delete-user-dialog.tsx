"use client";

import { faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/ui/button";
import { useDialog } from "@/components/ui/use-dialog";
import { Dialog } from "@/components/ui/dialog";
import { deleteUserAction } from "../../users/actions/delete-user.action";
import toast from "react-hot-toast";
import { useTransition } from "react";

type DeleteUserDialogProps = { userId: string };

export const DeleteUserDialog = ({ userId }: DeleteUserDialogProps) => {
  const { isOpen, closeDialog, openDialog } = useDialog();

  return (
    <>
      <Button
        size="icon"
        variant="ghost"
        onClick={openDialog}
        aria-label="Delete User"
      >
        <FontAwesomeIcon icon={faRemove} size="sm" />
      </Button>

      <Dialog title="Delete User?" isOpen={isOpen} onClose={closeDialog}>
        <DeleteUserForm userId={userId} onSuccess={closeDialog} />
      </Dialog>
    </>
  );
};

type DeleteUserFormProps = { userId: string; onSuccess: () => void };

const DeleteUserForm = ({ userId, onSuccess }: DeleteUserFormProps) => {
  const [isPending, startTransition] = useTransition();

  const handelSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    startTransition(async () => {
      const { error } = await deleteUserAction(userId);

      if (error) {
        toast.error(error);
        return;
      }

      toast.success("User deleted successfully");
      onSuccess();
    });
  };

  return (
    <div className="space-y-2">
      <p className="text-muted-foreground text-sm">
        This action cannot be undone.
      </p>
      <form onSubmit={handelSubmit}>
        <div className="flex items-center justify-end gap-2">
          <Button
            type="button"
            variant="secondary"
            onClick={onSuccess}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button type="submit" variant="destructive" disabled={isPending}>
            Yes
          </Button>
        </div>
      </form>
    </div>
  );
};
