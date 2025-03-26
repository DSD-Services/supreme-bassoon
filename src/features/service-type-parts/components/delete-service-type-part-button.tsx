"use client";

import { Button } from "@/components/ui/button";
import { deleteServiceTypePartsAction } from "@/features/service-types/actions/delete-service-type-parts.action";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";

type DeleteServiceTypePartButtonProps = {
  serviceTypeId: number;
  partId: number;
};

export const DeleteServiceTypePartButton = ({
  serviceTypeId,
  partId,
}: DeleteServiceTypePartButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleClick = () => {
    startTransition(async () => {
      await deleteServiceTypePartsAction({ serviceTypeId, partId });
      router.refresh();
      toast.success("Delete successful");
    });
  };

  return (
    <Button
      size="icon"
      variant="destructive"
      className="size-4 transition-transform hover:scale-105"
      onClick={handleClick}
      disabled={isPending}
    >
      <FontAwesomeIcon icon={faX} size="xs" />
    </Button>
  );
};
