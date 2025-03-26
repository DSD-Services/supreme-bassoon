import { findAllDepartments } from "@/features/departments/queries";
import { findAllServiceTypes } from "@/features/service-types/queries";
import { ServiceTypeList } from "./service-type-list";

type ServerTypeListServerProps = {
  initialQuery: string;
};

export const ServerTypeListServer = async ({
  initialQuery,
}: ServerTypeListServerProps) => {
  const [serviceTypesData, departmentsData] = await Promise.all([
    findAllServiceTypes({ query: initialQuery }),
    findAllDepartments(),
  ]);

  const serviceTypes = serviceTypesData.data;
  const departments = departmentsData.data;

  return (
    <ServiceTypeList
      serviceTypes={serviceTypes ?? []}
      departments={departments ?? []}
    />
  );
};
