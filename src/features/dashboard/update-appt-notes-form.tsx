"use client";

import type { HydratedWorkOrder } from "@/utils/supabase/types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  ApptNotesInput,
  ApptNotesSchema,
} from "../technician-details/components/schemas";
import { updateApptNotes } from "@/features/work-orders/actions/update-appt-notes.action";

type UpdateApptNotesFormProps = {
  workOrder: HydratedWorkOrder;
  onSuccess?: () => void;
};

export const UpdateApptNotesForm = ({
  workOrder,
  onSuccess,
}: UpdateApptNotesFormProps) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ApptNotesInput>({
    resolver: zodResolver(ApptNotesSchema),
    defaultValues: {
      appointmentNotes: workOrder.appointment_notes ?? "",
    },
  });

  useEffect(() => {
    if (!errors || typeof errors !== "object") return;

    const field = Object.keys(errors)?.[0] as keyof typeof errors;

    if (field && errors[field]?.message) {
      toast.error(errors[field].message);
    }
  }, [errors]);

  const submit = async (values: ApptNotesInput) => {
    if (!workOrder.id) return null;
    const { error } = await updateApptNotes(workOrder.id, values);

    if (error) {
      toast.error(error);
      return;
    }

    router.refresh();
    onSuccess?.();
    toast.success("Update successful");
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-2">
      <div className="flex gap-2">
        <div className="flex w-full flex-col">
          <label htmlFor="appointmentNotes" className="text-sm">
            Appointment Notes
          </label>
          <textarea
            id="appointmentNotes"
            {...register("appointmentNotes")}
            className="h-32 w-full resize-none rounded border p-2 text-sm"
            placeholder="Enter appointment notes..."
          />
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        Update
      </Button>
    </form>
  );
};
