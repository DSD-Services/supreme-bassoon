"use client";
// TODO -- onSubmit will need to be typed like the form data
// <WorkOrderFormData>
// TODO -- verify that required fields are filled out and validated
//    before moving to next step of form
// TODO -- render errors beneath inputs with error
//    message using React hook form
// TODO -- display dates in user timezone

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import type { Department, ServiceType } from "@/utils/supabase/types";
import type { BackgroundEvent } from "./types/calendar.types";
import type { Timeslot } from "@/lib/types/work-order-types";
import { groupTimeslotsByDay } from "./lib/generate-timeslots";
import { Profile } from "@/utils/supabase/types";
import Step2SelectDateTime from "./step-2-work-order-form";
import Step3ConfirmDateTime from "./step-3-work-order-form";
import Step4ContactInformation from "./step-4-work-order-form";
import Step5ConfirmAppointment from "./step-5-work-order-form";
import Step1DepartmentService from "./step-1-work-order-form";
import { createWorkOrderAction } from "@/features/work-orders/actions/create-work-order.action";
import {
  type CreateWorkOrderInput,
  CreateWorkOrderSchema,
} from "@/features/work-orders/schemas";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

type ScheduleWorkOrderFormProps = {
  sortedDepartments: Department[];
  userProfile: Profile;
};

export default function ScheduleWorkOrderForm({
  sortedDepartments: departments,
  userProfile: userProfile,
}: ScheduleWorkOrderFormProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isNextDisabled] = useState(false);
  // const [isNextDisabled, setIsNextDisabled] = useState(false);
  // const [isBackDisabled, setIsBackDisabled] = useState(false);
  const [backgroundEvents, setBackgroundEvents] = useState<BackgroundEvent[]>(
    [],
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [allTimeslots, setAllTimeslots] = useState<Timeslot[]>([]);
  const [filteredSlots, setFilteredSlots] = useState<Timeslot[]>([]);
  const [isTimeslotModalOpen, setIsTimeslotModalOpen] = useState(false);
  // const [selectedSlot, setSelectedSlot] = useState<Timeslot | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    watch,
    getValues,
    setValue,
    formState: { isSubmitting },
  } = useForm<CreateWorkOrderInput>({
    resolver: zodResolver(CreateWorkOrderSchema),
    defaultValues: {
      technicianId: undefined,
      departmentId: undefined,
      serviceTypeId: undefined,
      appointmentStart: undefined,
      appointmentEnd: undefined,
      appointmentNotes: `Scheduled by ${userProfile.first_name} ${userProfile.last_name}`,
      serviceAddress: {
        addressLine1: userProfile.address_line1 ?? "",
        addressLine2: userProfile.address_line2 ?? "",
        city: userProfile.city ?? "",
        state: userProfile.state ?? "",
        postalCode: userProfile.postal_code ?? "",
      },
    },
  });

  useEffect(() => {
    const backgroundEvents = groupTimeslotsByDay(allTimeslots);
    setBackgroundEvents(backgroundEvents);
  }, [allTimeslots]);

  const nextStep = async () => {
    if (step === 1) {
      const isValid = await trigger(["departmentId", "serviceTypeId"]);
      if (!isValid) {
        toast.error("Please fill out all fields.");
      } else {
        setStep(2);
      }
    }
    if (step === 3) {
      const isValid = await trigger(["serviceAddress"]);
      if (!isValid) {
        setStep(4);
      } else {
        setStep(5);
      }
    }
    if (step === 4) {
      const isValid = await trigger(["serviceAddress"]);
      if (!isValid) {
        toast.error("Please fill out all required fields.");
      } else {
        setStep(5);
      }
    }
  };

  const prevStep = () => {
    if (step === 3) {
      setValue("appointmentStart", "");
      setValue("appointmentEnd", "");
    }
    setStep((prev) => prev - 1);
  };

  const watchDepartmentId = watch("departmentId");
  const watchServiceTypeId = watch("serviceTypeId");

  useEffect(() => {
    if (isTimeslotModalOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [isTimeslotModalOpen]);

  const selectedDepartment = departments.find(
    (department) => department.id === +watchDepartmentId,
  );
  const selectedServiceType = serviceTypes.find(
    (serviceType) => serviceType.id === +watchServiceTypeId,
  );
  const departmentName = selectedDepartment?.name ?? "";
  const serviceTypeName = selectedServiceType?.name ?? "";

  const onSubmit = async (values: CreateWorkOrderInput) => {
    const res = await createWorkOrderAction(values);

    if (res?.error) {
      toast.error(res?.error);
    }

    toast.success("Work order created successfully!");
    router.push("/schedule/success");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex min-h-[500px] justify-center"
    >
      <div className="flex w-full items-center justify-center">
        {step === 1 && (
          <Step1DepartmentService
            register={register}
            reset={reset}
            departments={departments}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
            setServiceTypes={setServiceTypes}
            serviceTypes={serviceTypes}
            setIsDisabled={setIsDisabled}
            isDisabled={isDisabled}
            setAllTimeslots={setAllTimeslots}
            nextStep={nextStep}
            isNextDisabled={isNextDisabled}
            setValue={setValue}
          />
        )}
        {step === 2 && (
          <Step2SelectDateTime
            backgroundEvents={backgroundEvents}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            isTimeslotModalOpen={isTimeslotModalOpen}
            setIsTimeslotModalOpen={setIsTimeslotModalOpen}
            setValue={setValue}
            allTimeslots={allTimeslots}
            setFilteredSlots={setFilteredSlots}
            filteredSlots={filteredSlots}
            prevStep={prevStep}
            setStep={setStep}
          />
        )}
        {step === 3 && (
          <Step3ConfirmDateTime
            formValues={getValues()}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        )}
        {/* Client does not have address on file */}
        {step === 4 && (
          <Step4ContactInformation
            register={register}
            userProfile={userProfile}
            prevStep={prevStep}
            nextStep={nextStep}
            isNextDisabled={isNextDisabled}
          />
        )}
        {/* Client has address on file */}
        {step === 5 && (
          <Step5ConfirmAppointment
            userProfile={userProfile}
            formValues={getValues()}
            departmentName={departmentName}
            serviceTypeName={serviceTypeName}
            selectedDate={selectedDate}
            prevStep={prevStep}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </form>
  );
}
