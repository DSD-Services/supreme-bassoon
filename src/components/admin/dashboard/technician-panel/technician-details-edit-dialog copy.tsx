"use client";

import { Department, TechnicianDetail } from "@/utils/supabase/types";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  TechnicianDetailsSchema,
  type TechnicianDetailsInput,
} from "@/features/technician/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { updateTechnicianDetails } from "@/features/technician/actions/update-technician-details.action";
import { useRouter } from "next/navigation";
type TechnicianDetailsEditDialogProps = {
  technicianDetails:
    | (TechnicianDetail & { departments: { name: string } | null })
    | null;
};

export const TechnicianDetailsEditDialog = ({
  technicianDetails,
}: TechnicianDetailsEditDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [departments, setDepartments] = useState<Array<Department>>([]);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TechnicianDetailsInput>({
    resolver: zodResolver(TechnicianDetailsSchema),
    defaultValues: {
      breakEndTime: technicianDetails?.break_end_time,
      breakStartTime: technicianDetails?.break_start_time,
      departmentId: technicianDetails?.department_id,
      workDays: technicianDetails?.work_days,
      workEndTime: technicianDetails?.work_end_time,
      workStartTime: technicianDetails?.work_start_time,
    },
  });

  useEffect(() => {
    if (!errors || typeof errors !== "object") return;

    const errorKey = Object.keys(errors)?.[0] as keyof typeof errors;

    if (errorKey && errors[errorKey]?.message) {
      toast.error(errors[errorKey].message);
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
    setIsOpen(false);
    toast.success("Update successful");
  };

  useEffect(() => {
    (async function run() {
      const res = await fetch("/api/departments");
      const { data } = await res.json();
      setDepartments(data);
    })();
  }, []);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex w-fit cursor-pointer items-center rounded bg-yellow-500 px-2 py-1 text-sm font-bold uppercase transition hover:bg-yellow-500/80"
      >
        <FontAwesomeIcon icon={faPencil} className="mr-2 text-sm" />
        Edit
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs">
          <div className="bg-background w-full max-w-sm rounded border p-6 shadow-md">
            <div className="mb-4 flex justify-between">
              <h2 className="text-xl font-bold">Form</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-lg font-bold"
              >
                X
              </button>
            </div>
            <form onSubmit={handleSubmit(submit)} className="space-y-4">
              <div className="flex justify-between gap-2">
                <div className="flex-1 space-y-2">
                  <p className="border-b">Work Times</p>

                  <div className="flex flex-col">
                    <label htmlFor="workStartTime" className="text-sm">
                      Start Time
                    </label>
                    <input
                      type="time"
                      id="workStartTime"
                      {...register("workStartTime")}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="workEndTime" className="text-sm">
                      End Time
                    </label>
                    <input
                      type="time"
                      id="workEndTime"
                      {...register("workEndTime")}
                    />
                  </div>
                </div>

                <div className="flex-1 space-y-2">
                  <p className="border-b">Break Times</p>
                  <div className="flex flex-col">
                    <label htmlFor="breakStartTime" className="text-sm">
                      Start Time
                    </label>
                    <input
                      type="time"
                      id="breakStartTime"
                      {...register("breakStartTime")}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="breakEndTime" className="text-sm">
                      End Time
                    </label>
                    <input
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
                    <label key={day} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        value={day}
                        {...register("workDays")}
                      />
                      {day.substring(0, 2)}
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex flex-col">
                <label htmlFor="departmentId" className="text-sm">
                  Department
                </label>
                {
                  <select id="departmentId" {...register("departmentId")}>
                    {departments.map((department) => (
                      <option key={department.id} value={department.id}>
                        {department.name}
                      </option>
                    ))}
                  </select>
                }
              </div>
              <button
                type="submit"
                className="bg-primary hover:bg-primary/70 text-primary-foreground w-full rounded px-2 py-1 font-bold transition disabled:opacity-50"
                disabled={isSubmitting}
              >
                Update
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
