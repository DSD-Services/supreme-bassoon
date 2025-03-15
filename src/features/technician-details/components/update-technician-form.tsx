"use client";

import type {
  Department,
  TechnicianDetail,
  UserRole,
} from "@/utils/supabase/types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  TechnicianDetailsSchema,
  type TechnicianDetailsInput,
} from "@/features/technician-details/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { updateTechnicianDetails } from "@/features/technician-details/actions/update-technician-details.action";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { findAllDepartments } from "@/features/departments/queries";

type UpdateTechnicianFormProps = {
  technicianDetails:
    | (TechnicianDetail & { departments: { name: string } | null })
    | null;
  onSuccess?: () => void;
  role: UserRole;
};

export const UpdateTechnicianForm = ({
  technicianDetails,
  onSuccess,
  role,
}: UpdateTechnicianFormProps) => {
  const [departments, setDepartments] = useState<Array<Department>>([]);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TechnicianDetailsInput>({
    resolver: zodResolver(TechnicianDetailsSchema),
    defaultValues: {
      breakEndTime: technicianDetails?.break_end_time,
      breakStartTime: technicianDetails?.break_start_time,
      departmentId: technicianDetails?.department_id ?? 1,
      workDays: technicianDetails?.work_days,
      workEndTime: technicianDetails?.work_end_time,
      workStartTime: technicianDetails?.work_start_time,
    },
  });

  useEffect(() => {
    if (!errors || typeof errors !== "object") return;

    const field = Object.keys(errors)?.[0] as keyof typeof errors;

    if (field && errors[field]?.message) {
      toast.error(errors[field].message);
    }
  }, [errors]);

  const submit = async (values: TechnicianDetailsInput) => {
    if (!technicianDetails?.id) return null;
    const { error } = await updateTechnicianDetails(
      technicianDetails.id,
      values,
    );

    if (error) {
      toast.error(error);
      return;
    }

    router.refresh();
    onSuccess?.();
    toast.success("Update successful");
  };

  useEffect(() => {
    (async function run() {
      const { data } = await findAllDepartments();
      if (data) setDepartments(data);
      if (technicianDetails?.department_id) {
        setValue("departmentId", technicianDetails?.department_id);
      }
    })();
  }, [setValue, technicianDetails]);

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4">
      <div className="flex justify-between gap-2">
        <div className="flex-1 space-y-2">
          <p className="border-b">Work Times</p>

          <div className="flex flex-col">
            <label htmlFor="workStartTime" className="text-sm">
              Start Time
            </label>
            <Input
              type="time"
              id="workStartTime"
              {...register("workStartTime")}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="workEndTime" className="text-sm">
              End Time
            </label>
            <Input type="time" id="workEndTime" {...register("workEndTime")} />
          </div>
        </div>

        <div className="flex-1 space-y-2">
          <p className="border-b">Break Times</p>
          <div className="flex flex-col">
            <label htmlFor="breakStartTime" className="text-sm">
              Start Time
            </label>
            <Input
              type="time"
              id="breakStartTime"
              {...register("breakStartTime")}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="breakEndTime" className="text-sm">
              End Time
            </label>
            <Input
              type="time"
              id="breakEndTime"
              {...register("breakEndTime")}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <label htmlFor="workDays" className="text-sm">
          Work Days
        </label>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {[
            "MONDAY",
            "TUESDAY",
            "WEDNESDAY",
            "THURSDAY",
            "FRIDAY",
            "SATURDAY",
            "SUNDAY",
          ].map((day) => (
            <label key={day}>
              <Input type="checkbox" value={day} {...register("workDays")} />
              {day.substring(0, 2)}
            </label>
          ))}
        </div>
      </div>
      <div className="flex flex-col">
        <label htmlFor="departmentId" className="text-sm">
          Department
        </label>
        {role === "ADMIN" ? (
          <Select id="departmentId" {...register("departmentId")}>
            {departments.map((department) => (
              <option key={department.id} value={department.id}>
                {department.name}
              </option>
            ))}
          </Select>
        ) : (
          <Input
            type="text"
            id="departmentId"
            value={technicianDetails?.departments?.name ?? ""}
            className="pointer-events-none opacity-50"
            readOnly
          />
        )}
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        Update
      </Button>
    </form>
  );
};
