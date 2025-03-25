import { findAllDepartments } from "@/features/departments/queries";
import { DepartmentList } from "@/features/departments/components/department-list";

export const DepartmentListServer = async () => {
  const { data: departments } = await findAllDepartments();

  return <DepartmentList departments={departments ?? []} />;
};
