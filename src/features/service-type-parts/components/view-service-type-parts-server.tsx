import type { ServiceType } from "@/utils/supabase/types";
import { ViewServiceTypePartsDialog } from "./view-service-type-parts-dialog";
import { findAllServiceTypeParts } from "@/features/service-type-parts/queries";
import { findAllParts } from "@/features/parts/queries";

type ViewServiceTypePartsServerDialogProps = {
  serviceType: ServiceType;
};

export const ViewServiceTypePartsServer = async ({
  serviceType,
}: ViewServiceTypePartsServerDialogProps) => {
  const { data: serviceTypeParts } = await findAllServiceTypeParts(
    serviceType.id,
  );
  const { data: parts } = await findAllParts();

  const filteredParts = (parts ?? []).filter((part) => {
    return !serviceTypeParts?.find((stp) => stp.part_id === part.id);
  });

  return (
    <ViewServiceTypePartsDialog
      serviceType={serviceType}
      serviceTypeParts={serviceTypeParts}
      parts={filteredParts}
    />
  );
};
