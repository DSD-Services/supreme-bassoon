"use client";

import { createServiceTypeAction } from "@/features/service-types/actions/create-service-type.action";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";

export const CreateServiceTypeForm = () => {
  const [state, formAction, isPending] = useActionState(
    createServiceTypeAction,
    undefined,
  );

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state?.error]);

  return (
    <form action={formAction} className="flex flex-col gap-2 sm:flex-row">
      <div>
        <label htmlFor="name" className="sr-only">
          Name
        </label>
        <Input type="text" id="name" name="name" placeholder="Name" />
      </div>

      <Button
        type="submit"
        variant="ghost"
        className="self-start"
        disabled={isPending}
      >
        <FontAwesomeIcon icon={faAdd} />
        Insert
      </Button>
    </form>
  );
};
