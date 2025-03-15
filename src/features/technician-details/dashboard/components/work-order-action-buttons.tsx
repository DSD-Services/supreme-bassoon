"use client";

import { Button } from "@/components/ui/button";
import { updateWorkOrderStatusAction } from "@/features/work-orders/actions/update-work-order-status-.action";
import type { WorkOrderStatus } from "@/utils/supabase/types";
import {
  faCancel,
  faCircleCheck,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";

type WorkOrderActionButtonsProps = {
  workOrderId: number;
  currentWorkOrderStatus: WorkOrderStatus;
};

export const WorkOrderActionButtons = ({
  workOrderId,
  currentWorkOrderStatus,
}: WorkOrderActionButtonsProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const changeOrderStatus = (status: WorkOrderStatus) => {
    startTransition(async () => {
      const { error } = await updateWorkOrderStatusAction(workOrderId, status);

      if (error) {
        toast.error(`Error updating work order status: ${error.message}`);
      } else {
        router.refresh();
        toast.success("Work order status updated successfully");
      }
    });
  };

  return (
    <div className="flex justify-center gap-4">
      {currentWorkOrderStatus === "PENDING" ? (
        <>
          <Button
            type="button"
            onClick={() => changeOrderStatus("IN_PROGRESS")}
            disabled={isPending}
            variant="destructive"
          >
            <FontAwesomeIcon icon={faCancel} className="text-2xl" />
            {isPending && currentWorkOrderStatus === "PENDING"
              ? "Cancelling..."
              : "Cancel"}
          </Button>
          <Button
            type="button"
            onClick={() => changeOrderStatus("IN_PROGRESS")}
            disabled={isPending}
            variant="success"
          >
            <FontAwesomeIcon icon={faThumbsUp} className="text-2xl" />
            {isPending && currentWorkOrderStatus === "PENDING"
              ? "Updating..."
              : "Accept"}
          </Button>
        </>
      ) : currentWorkOrderStatus === "IN_PROGRESS" ? (
        <>
          <Button
            type="button"
            onClick={() => changeOrderStatus("IN_PROGRESS")}
            disabled={isPending}
            variant="destructive"
          >
            <FontAwesomeIcon icon={faCancel} className="text-2xl" />
            {isPending && currentWorkOrderStatus === "IN_PROGRESS"
              ? "Cancelling..."
              : "Cancel"}
          </Button>
          <Button
            type="button"
            onClick={() => changeOrderStatus("COMPLETED")}
            disabled={isPending}
          >
            {isPending && currentWorkOrderStatus === "IN_PROGRESS"
              ? "Updating..."
              : "Complete"}
          </Button>
        </>
      ) : currentWorkOrderStatus === "COMPLETED" ? (
        <Button type="button" disabled={true}>
          <FontAwesomeIcon icon={faCircleCheck} className="text-2xl" />
          Completed
        </Button>
      ) : (
        <Button type="button" disabled={true} variant="destructive">
          <FontAwesomeIcon icon={faCancel} className="text-2xl" />
          Cancelled
        </Button>
      )}
    </div>
  );
};
