import { Button } from "../ui/button";
import { Select } from "../ui/select";
import StepButtons from "./step-buttons";
import { fetchServiceTypes, fetchTimeslots } from "./lib/work-order-queries";
import toast from "react-hot-toast";
import { Department, ServiceType } from "@/utils/supabase/types";
import { cn } from "@/lib/utils";
import {
  FieldErrors,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { Timeslot } from "@/lib/types/work-order-types";
import { CreateWorkOrderInput } from "@/features/work-orders/schemas";

interface Step1DepartmentServiceProps {
  register: UseFormRegister<CreateWorkOrderInput>;
  errors: FieldErrors<CreateWorkOrderInput>;
  clearErrors: UseFormClearErrors<CreateWorkOrderInput>;
  departments: Department[];
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setServiceTypes: React.Dispatch<React.SetStateAction<ServiceType[]>>;
  serviceTypes: ServiceType[];
  setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  isDisabled: boolean;
  setAllTimeslots: React.Dispatch<React.SetStateAction<Timeslot[]>>;
  step: number;
  nextStep: () => void;
  setValue: UseFormSetValue<CreateWorkOrderInput>;
}

export default function Step1DepartmentService({
  register,
  errors,
  clearErrors,
  departments,
  setIsLoading,
  isLoading,
  setServiceTypes,
  serviceTypes,
  setIsDisabled,
  isDisabled,
  setAllTimeslots,
  step,
  nextStep,
  setValue,
}: Step1DepartmentServiceProps) {
  const handleDepartmentSelect = async (
    evt: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const departmentId = evt.target.value;
    clearErrors("departmentId");
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
      setValue("technicianId", timeslots?.[0].extendedProps.technicianId ?? "");
      setAllTimeslots(timeslots ?? []);
    }
  };

  const handleReset = () => {
    clearErrors("departmentId");
    clearErrors("serviceTypeId");

    setValue("departmentId", "" as unknown as number);
    setValue("serviceTypeId", "" as unknown as number);
    setValue("technicianId", "");
    setIsDisabled(true);
    setServiceTypes([]);
  };

  return (
    <div
      aria-current={step === 1 ? "step" : undefined}
      className="-mt-10 w-11/12 max-w-[500px] self-center rounded-lg bg-white p-4 shadow-lg sm:w-3/4 sm:p-6 md:w-3/5 lg:w-1/2"
    >
      <h1 className="mb-6 text-center text-2xl font-medium lg:text-3xl">
        Schedule an Appointment
      </h1>
      <h2 className="text-center text-base font-semibold md:text-lg">
        Select Department & Service:
      </h2>
      <div className="flex flex-col pt-6">
        <label htmlFor="department" className="text-sm text-blue-800">
          Department
        </label>
        <Select
          id="department"
          {...register("departmentId", { required: true })}
          onChange={handleDepartmentSelect}
          className="rounded-lg border-r-10 border-transparent bg-blue-100 px-3 text-sm shadow-lg outline-blue-200 hover:cursor-pointer md:text-base"
        >
          <option value="">Select a department (Required)</option>
          {departments.map((department: Department) => (
            <option key={department.id} value={department.id}>
              {department.name}
            </option>
          ))}
        </Select>
        <div className="h-6">
          {errors.departmentId && (
            <span
              className="text-sm text-red-500"
              role="alert"
              aria-live="polite"
            >
              {errors.departmentId.message}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col pt-3">
        <label htmlFor="serviceType" className="text-sm text-blue-800">
          Service Type
        </label>
        <Select
          id="serviceType"
          {...register("serviceTypeId", { required: true })}
          className={cn(
            "rounded-lg border-r-10 border-transparent bg-blue-100 px-3 text-sm shadow-lg outline-blue-200 hover:cursor-pointer md:text-base",
            {
              "bg-slate-300 text-slate-600": isDisabled,
              "animate-pulse opacity-50": isLoading,
            },
          )}
          onChange={() => {
            clearErrors("serviceTypeId");
          }}
          disabled={isDisabled}
          aria-disabled={isDisabled}
          aria-describedby="serviceType-desc"
        >
          <option value="">
            {isLoading ? "Loading..." : "Select a service type (Required)"}
          </option>
          {serviceTypes.map((service: ServiceType) => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
        </Select>
        <span id="serviceType-desc" className="sr-only">
          {isDisabled
            ? "Select a department first to enable service types."
            : ""}
        </span>
        <div className="h-6">
          {errors.serviceTypeId && (
            <span
              className="text-sm text-red-500"
              role="alert"
              aria-live="polite"
            >
              {errors.serviceTypeId.message}
            </span>
          )}
        </div>
      </div>
      <div className="mt-6 flex justify-between gap-10">
        <Button
          type="button"
          onClick={handleReset}
          className="bg-blue-800"
          aria-label="Reset department and service type form selections"
        >
          Reset
        </Button>
        <StepButtons variant="nextOnly" nextStep={nextStep} />
      </div>
    </div>
  );
}
