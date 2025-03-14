import { Button } from "../ui/button";
import { Select } from "../ui/select";
import StepButtons from "./step-buttons";
import { fetchServiceTypes, fetchTimeslots } from "./lib/work-order-queries";
import toast from "react-hot-toast";
import { Department, ServiceType } from "@/utils/supabase/types";
import { cn } from "@/lib/utils";
import { UseFormRegister, UseFormReset } from "react-hook-form";
import { FormState } from "./types/form-state";
import { Timeslot } from "@/lib/types/work-order-types";

interface Step1DepartmentServiceProps {
  register: UseFormRegister<FormState>;
  reset: UseFormReset<FormState>;
  departments: Department[];
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setServiceTypes: React.Dispatch<React.SetStateAction<ServiceType[]>>;
  serviceTypes: ServiceType[];
  setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  isDisabled: boolean;
  setAllTimeslots: React.Dispatch<React.SetStateAction<Timeslot[]>>;
  nextStep: () => void;
  isNextDisabled: boolean;
}

export default function Step1DepartmentService({
  register,
  reset,
  departments,
  setIsLoading,
  isLoading,
  setServiceTypes,
  serviceTypes,
  setIsDisabled,
  isDisabled,
  setAllTimeslots,
  nextStep,
  isNextDisabled,
}: Step1DepartmentServiceProps) {
  const handleDepartmentSelect = async (
    evt: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const departmentId = evt.target.value;
    if (!departmentId) return;

    setIsLoading(true);
    const { data: serviceTypes, error: fetchServiceTypesError } =
      await fetchServiceTypes(departmentId);
    setIsLoading(false);
    if (fetchServiceTypesError) {
      toast.error(fetchServiceTypesError);
    } else {
      setServiceTypes(serviceTypes ?? []);
      setIsDisabled(false);
    }

    const { data: timeslots, error: fetchTimeslotsError } =
      await fetchTimeslots(departmentId);
    if (fetchTimeslotsError) {
      toast.error(fetchTimeslotsError);
    } else {
      setAllTimeslots(timeslots ?? []);
    }
  };

  const handleReset = () => {
    reset({
      departmentId: "",
      serviceTypeId: "",
    });
    setIsDisabled(true);
    setServiceTypes([]);
  };

  return (
    <div className="w-11/12 sm:w-3/4 md:w-3/5 lg:w-1/2">
      <h2 className="text-center text-lg font-semibold">
        Step 1: Select Department & Service
      </h2>
      <div className="flex flex-col pt-6">
        <label htmlFor="department" className="text-sm text-blue-800">
          Department
        </label>
        <Select
          {...register("departmentId", { required: true })}
          onChange={handleDepartmentSelect}
          className="rounded-lg border-r-10 border-transparent bg-white px-3 py-2 text-sm shadow-lg hover:cursor-pointer md:text-base"
        >
          <option value="">-- Please select a department --</option>
          {departments.map((department: Department) => (
            <option key={department.id} value={department.id}>
              {department.name}
            </option>
          ))}
        </Select>
      </div>
      <div className="flex flex-col pt-6">
        <label htmlFor="serviceType" className="text-sm text-blue-800">
          Service Type
        </label>
        <Select
          {...register("serviceTypeId", { required: true })}
          className={cn(
            "rounded-lg border-r-10 border-transparent bg-white px-3 py-2 text-sm shadow-lg hover:cursor-pointer md:text-base",
            {
              "bg-slate-300 text-slate-600": isDisabled,
              "animate-pulse opacity-50": isLoading,
            },
          )}
          disabled={isDisabled}
        >
          <option value="">
            {isLoading ? "Loading..." : "-- Please select a service --"}
          </option>
          {serviceTypes.map((service: ServiceType) => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
        </Select>
      </div>
      <div className="mt-4 flex justify-between gap-10">
        <Button type="button" variant="destructive" onClick={handleReset}>
          Reset
        </Button>
        <StepButtons
          variant="nextOnly"
          nextStep={nextStep}
          isNextDisabled={isNextDisabled}
        />
      </div>
    </div>
  );
}
