import type {
  Department,
  DepartmentServiceType,
  ServiceType,
} from "@/utils/supabase/types";
import { UpdateServiceTypeForm } from "@/features/service-types/components/update-service-type-form";
import { UpdateServiceTypeDepartmentDialog } from "@/features/department-service-types/components/update-service-type-department-dialog";
import { ViewServiceTypePartsServer } from "@/features/service-type-parts/components/view-service-type-parts-server";
import { DeleteServiceTypeDialog } from "@/features/service-types/components/delete-service-type-dialog";
import { Suspense } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";

type ServerTypeListProps = {
  serviceTypes: Array<
    ServiceType & {
      department_service_types:
        | (DepartmentServiceType & {
            departments: Department;
          })
        | null;
    }
  >;
  departments: Array<Department>;
};

export const ServiceTypeList = ({
  serviceTypes,
  departments,
}: ServerTypeListProps) => {
  return (
    <tbody>
      {serviceTypes?.map((serviceType) => (
        <tr key={serviceType.id} className="divide-x">
          <td className="w-full px-6 py-3">
            <UpdateServiceTypeForm serviceType={serviceType} />
          </td>
          <td className="px-6 py-3">
            <UpdateServiceTypeDepartmentDialog
              serviceType={serviceType}
              departments={departments}
            />
          </td>
          <td className="px-6 py-3">
            <Suspense
              fallback={
                <Button size="sm" disabled variant="ghost" className="w-full">
                  <FontAwesomeIcon icon={faEye} />
                </Button>
              }
            >
              <ViewServiceTypePartsServer serviceType={serviceType} />
            </Suspense>
          </td>
          <td className="px-6 py-3">
            <DeleteServiceTypeDialog serviceTypeId={serviceType.id} />
          </td>
        </tr>
      ))}
    </tbody>
  );
};
