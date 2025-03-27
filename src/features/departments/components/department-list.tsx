import type { Department } from "@/utils/supabase/types";
import { UpdateDepartmentForm } from "@/features/departments/components/update-department-form";
import { DeleteDepartmentDialog } from "@/features/departments/components/delete-department-dialog";

type DepartmentListProps = { departments: Array<Department> };

export const DepartmentList = ({ departments }: DepartmentListProps) => {
  return (
    <tbody>
      {departments?.map((department) => (
        <tr key={department.id} className="divide-x">
          <td className="w-full px-6 py-3">
            <UpdateDepartmentForm department={department} />
          </td>
          <td className="px-6 py-3">
            <DeleteDepartmentDialog departmentId={department.id} />
          </td>
        </tr>
      ))}
    </tbody>
  );
};
