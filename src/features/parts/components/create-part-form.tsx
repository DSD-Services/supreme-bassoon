"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useActionState, useEffect } from "react";
import { createPartAction } from "@/features/parts/actions/create-part.action";
import toast from "react-hot-toast";

export const CreatePartForm = () => {
  const [state, formAction, isPending] = useActionState(
    createPartAction,
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

      <div>
        <label htmlFor="quantity" className="sr-only">
          Quantity
        </label>
        <Input
          type="number"
          id="quantity"
          name="quantity"
          placeholder="Quantity"
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
        />
      </div>

      <Button
        type="submit"
        variant="ghost"
        className="self-start"
        disabled={isPending}
      >
        <FontAwesomeIcon icon={faAdd} />
        {isPending ? "Creating..." : "Create Part"}
      </Button>
    </form>
  );
};
