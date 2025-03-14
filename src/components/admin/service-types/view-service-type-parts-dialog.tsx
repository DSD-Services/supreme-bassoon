"use client";

import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/ui/button";
import { useDialog } from "@/components/ui/use-dialog";
import { Dialog } from "@/components/ui/dialog";
import type {
  Part,
  ServiceType,
  ServiceTypePart,
} from "@/utils/supabase/types";
import { UpdateServiceTypePartsForm } from "./update-service-type-parts-form";
import { DeleteServiceTypePartButton } from "./delete-service-type-part-button";
import { CreateServiceTypePartsForm } from "./create-service-type-parts-form";

type ViewServiceTypePartsDialogProps = {
  serviceType: ServiceType;
  serviceTypeParts: Array<ServiceTypePart & { parts: Part }> | null;
  parts: Array<Part> | null;
};

export const ViewServiceTypePartsDialog = ({
  serviceType,
  serviceTypeParts,
  parts,
}: ViewServiceTypePartsDialogProps) => {
  const { isOpen, closeDialog, openDialog } = useDialog();

  return (
    <>
      <Button
        size="sm"
        variant="ghost"
        onClick={openDialog}
        className="w-full"
        aria-label="View Service Type Parts"
      >
        <FontAwesomeIcon icon={faEye} />
      </Button>

      <Dialog title="Service Type Parts" isOpen={isOpen} onClose={closeDialog}>
        <>
          <ul className="space-y-2 rounded p-2">
            {serviceTypeParts?.map((serviceTypePart) => {
              return (
                <li
                  key={serviceTypePart.id}
                  className="grid grid-cols-3 items-center gap-2 text-sm"
                >
                  <span>{serviceTypePart.parts.name}</span>
                  <UpdateServiceTypePartsForm
                    serviceTypePart={serviceTypePart}
                    serviceTypeId={serviceType.id}
                  />
                  <div className="justify-self-end">
                    <DeleteServiceTypePartButton
                      serviceTypeId={serviceType.id}
                      partId={serviceTypePart.parts.id}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
          {parts && parts.length > 0 ? (
            <CreateServiceTypePartsForm
              serviceTypeId={serviceType.id}
              parts={parts}
            />
          ) : null}
        </>
      </Dialog>
    </>
  );
};
