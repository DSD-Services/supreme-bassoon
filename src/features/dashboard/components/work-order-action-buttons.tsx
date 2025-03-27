"use client";

import { Button } from "@/components/ui/button";
// import Tooltip from "@/components/ui/tooltip";
import { updateWorkOrderStatusAction } from "@/features/work-orders/actions/update-work-order-status-.action";
// import { diffInHours } from "@/lib/utils";
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
  userRole: string;
  aptStart: string;
  clientEmail: string;
};

export const WorkOrderActionButtons = ({
  workOrderId,
  currentWorkOrderStatus,
  userRole,
  aptStart,
  clientEmail,
}: WorkOrderActionButtonsProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const changeOrderStatus = (status: WorkOrderStatus) => {
    startTransition(async () => {
      const { error } = await updateWorkOrderStatusAction({
        workOrderId,
        status,
        aptStart,
        clientEmail,
      });

      if (error) {
        toast.error(error);
      } else {
        router.refresh();
        toast.success("Work order status updated successfully");
      }
    });
  };

  if (userRole === "CLIENT") {
    // const canCancel = diffInHours(aptStart) > 24;
    return null;

    // return (
    //   <div className="flex justify-center gap-4">
    //     {currentWorkOrderStatus === "PENDING" ? (
    //       canCancel ? (
    //         <Button
    //           type="button"
    //           size="sm"
    //           onClick={() => changeOrderStatus("CANCELLED")}
    //           disabled={isPending}
    //           variant="destructive"
    //         >
    //           <FontAwesomeIcon icon={faCancel} className="text-2xl" />
    //           Cancel
    //         </Button>
    //       ) : (
    //         <CannotCancelTooltip />
    //       )
    //     ) : null}
    //     {currentWorkOrderStatus === "IN_PROGRESS" ? (
    //       canCancel ? (
    //         <Button
    //           type="button"
    //           size="sm"
    //           onClick={() => changeOrderStatus("CANCELLED")}
    //           disabled={isPending}
    //           variant="destructive"
    //         >
    //           <FontAwesomeIcon icon={faCancel} className="text-2xl" />
    //           Cancel
    //         </Button>
    //       ) : (
    //         <CannotCancelTooltip />
    //       )
    //     ) : null}
    //     {currentWorkOrderStatus === "COMPLETED" ? (
    //       <Button type="button" size="sm" disabled={true}>
    //         <FontAwesomeIcon icon={faCircleCheck} className="text-2xl" />
    //         Completed
    //       </Button>
    //     ) : null}
    //     {currentWorkOrderStatus === "CANCELLED" ? (
    //       <Button type="button" size="sm" disabled={true} variant="destructive">
    //         <FontAwesomeIcon icon={faCancel} className="text-2xl" />
    //         Cancelled
    //       </Button>
    //     ) : null}
    //   </div>
    // );
  }

  if (userRole === "TECHNICIAN" || userRole === "ADMIN") {
    return (
      <div className="flex justify-center gap-4">
        {currentWorkOrderStatus === "PENDING" ? (
          <>
            <Button
              type="button"
              size="sm"
              onClick={() => changeOrderStatus("CANCELLED")}
              disabled={isPending}
              variant="destructive"
            >
              <FontAwesomeIcon icon={faCancel} className="text-2xl" />
              Cancel
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={() => changeOrderStatus("IN_PROGRESS")}
              disabled={isPending}
              variant="success"
            >
              <FontAwesomeIcon icon={faThumbsUp} className="text-2xl" />
              Accept
            </Button>
          </>
        ) : currentWorkOrderStatus === "IN_PROGRESS" ? (
          <>
            <Button
              type="button"
              size="sm"
              onClick={() => changeOrderStatus("CANCELLED")}
              disabled={isPending}
              variant="destructive"
            >
              <FontAwesomeIcon icon={faCancel} className="text-2xl" />
              Cancel
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={() => changeOrderStatus("COMPLETED")}
              disabled={isPending}
            >
              <FontAwesomeIcon icon={faCircleCheck} className="text-2xl" />
              Complete
            </Button>
          </>
        ) : null}
      </div>
    );
  }

  return null;
};

<!-- 
// const CannotCancelTooltip = () => {
//   return (
//     <Tooltip infoText="Unable to cancel within 24hrs of appointment">
//       <Button type="button" variant="destructive" size="sm" disabled={true}>
//         <FontAwesomeIcon icon={faCancel} className="text-2xl" />
//         Cancel
//       </Button>
//     </Tooltip>
//   );
// };
 -->
