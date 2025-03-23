"use client";

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useDialog } from "@/components/ui/use-dialog";
import { updatePartAction } from "@/features/parts/actions/update-part.action";
import { Part } from "@/utils/supabase/types";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";

type UpdatePartDialogProps = { part: Part };
export const UpdatePartDialog = ({ part }: UpdatePartDialogProps) => {
  const { isOpen, closeDialog, openDialog } = useDialog();

  return (
    <>
      <Button
        size="icon"
        variant="warning"
        onClick={openDialog}
        aria-label="Update Part"
      >
        <FontAwesomeIcon icon={faEdit} />
      </Button>

      <Dialog title="Update Part" isOpen={isOpen} onClose={closeDialog}>
        <UpdatePartForm part={part} onCancel={closeDialog} />
      </Dialog>
    </>
  );
};

type UpdatePartFormProps = { part: Part; onCancel: () => void };

const UpdatePartForm = ({ part, onCancel }: UpdatePartFormProps) => {
  const action = updatePartAction.bind(null, part.id);
  const [state, formAction, isPending] = useActionState(action, undefined);

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }

    if (state?.success) {
      toast.success("Part updated successfully!");
      onCancel();
    }
  }, [state, onCancel]);

  return (
    <form action={formAction} className="flex flex-col gap-2">
      <div>
        <label htmlFor="name" className="sr-only">
          Name
        </label>
        <Input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          defaultValue={part.name}
        />
      </div>

      <div>
        <label htmlFor="quantity" className="sr-only">
          Quantity
        </label>
        <Input
          type="number"
          id="quantity"
          name="quantity"
          placeholder="Quantity"
          defaultValue={part.quantity}
        />
      </div>

      <div>
        <label htmlFor="manufacturer" className="sr-only">
          Manufacturer
        </label>
        <Input
          type="text"
          id="manufacturer"
          name="manufacturer"
          placeholder="Manufacturer"
          defaultValue={part.manufacturer || ""}
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button
          size="sm"
          variant="secondary"
          className="flex-1"
          onClick={() => onCancel()}
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="warning"
          size="sm"
          className="flex-1"
          disabled={isPending}
        >
          <FontAwesomeIcon icon={faEdit} />
          {isPending ? "Updating..." : "Update Part"}
        </Button>
      </div>
    </form>
  );
};
