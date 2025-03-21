"use client";
// TODO -- display dates in user timezone

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import type { Department, ServiceType } from "@/utils/supabase/types";
import type { BackgroundEvent } from "./types/calendar.types";
import type { Timeslot } from "@/lib/types/work-order-types";
import { groupTimeslotsByDay } from "./lib/generate-timeslots";
import { Profile } from "@/utils/supabase/types";
import { createWorkOrderAction } from "@/features/work-orders/actions/create-work-order.action";
import {
  type CreateWorkOrderInput,
  CreateWorkOrderSchema,
} from "@/features/work-orders/schemas";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Step1DepartmentService from "./step-1-work-order-form";
import Step2SelectDateTime from "./step-2-work-order-form";
import Step3ConfirmDateTime from "./step-3-work-order-form";
import Step4SelectAddress from "./step-4-work-order-form";
import Step5ContactInformation from "./step-5-work-order-form";
import Step6ConfirmAppointment from "./step-6-work-order-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

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
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [backgroundEvents, setBackgroundEvents] = useState<BackgroundEvent[]>(
    [],
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [allTimeslots, setAllTimeslots] = useState<Timeslot[]>([]);
  const [filteredSlots, setFilteredSlots] = useState<Timeslot[]>([]);
  const [isTimeslotModalOpen, setIsTimeslotModalOpen] = useState(false);
  const [hasAddressOnFile, setHasAddressOnFile] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<"onFile" | "new">(
    "onFile",
  );

  const {
    register,
    handleSubmit,
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
      jobDetails: "",
      appointmentNotes: "",
      primaryPhone: undefined,
      secondaryPhone: undefined,
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

  useEffect(() => {
    if (
      !!userProfile.address_line1 &&
      !!userProfile.city &&
      !!userProfile.state &&
      !!userProfile.postal_code
    ) {
      setHasAddressOnFile(true);
    }
  }, [
    userProfile.address_line1,
    userProfile.city,
    userProfile.state,
    userProfile.postal_code,
  ]);

  useEffect(() => {
    if (step === 5) {
      if (selectedAddress === "onFile") {
        setValue("serviceAddress", {
          addressLine1: userProfile.address_line1 ?? "",
          addressLine2: userProfile.address_line2 ?? null,
          city: userProfile.city ?? "",
          state: userProfile.state ?? "",
          postalCode: userProfile.postal_code ?? "",
        });
      } else {
        setValue("serviceAddress", {
          addressLine1: "",
          addressLine2: null,
          city: "",
          state: "",
          postalCode: "",
        });
      }
    }
  }, [step, selectedAddress, setValue, userProfile]);

  const nextStep = async () => {
    if (step === 1) {
      const isValid = await trigger(["departmentId", "serviceTypeId"]);
      if (!isValid) {
        toast.error("Please fill out all fields.");
        setIsNextDisabled(true);
      } else {
        setIsNextDisabled(false);
        setStep(2);
      }
    }
    if (step === 2) {
      if (getValues("appointmentStart") && getValues("appointmentEnd")) {
        setStep(3);
      } else {
        toast.error("Please select a date and timeslot.");
      }
    }
    if (step === 3) {
      if (hasAddressOnFile) {
        setStep(4);
      } else {
        setStep(5);
      }
    }
    if (step === 4) {
      setStep(5);
    }
    if (step === 5) {
      const isValid = await trigger([
        "serviceAddress.addressLine1",
        "serviceAddress.city",
        "serviceAddress.state",
        "serviceAddress.postalCode",
        "primaryPhone",
      ]);

      if (isValid) {
        setStep(6);
      } else {
        toast.error("Please fill out all required fields.");
      }
    }
  };

  const prevStep = () => {
    if (step === 3) {
      setValue("appointmentStart", "");
      setValue("appointmentEnd", "");
    }
    if (step === 4) {
      if (selectedAddress === "onFile") {
        setValue("serviceAddress", {
          addressLine1: userProfile.address_line1 ?? "",
          addressLine2: userProfile.address_line2 ?? "",
          city: userProfile.city ?? "",
          state: userProfile.state ?? "",
          postalCode: userProfile.postal_code ?? "",
        });
      }
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
    try {
      const res = await createWorkOrderAction(values);
      if (res?.error) {
        toast.error(res?.error);
        return;
      }
      toast.success("Work order created successfully!");
      router.push("/schedule/success");
    } catch (error) {
      console.error("Error submitting appointment request:", error);
      toast.error("Something went wrong, please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex min-h-[500px] justify-center"
    >
      {isSubmitting && (
        <div className="bg-opacity-80 fixed inset-0 z-10 flex flex-col items-center justify-center backdrop-blur-sm">
          <div>
            <FontAwesomeIcon
              icon={faCog}
              spin
              className="text-2xl text-blue-500"
            />
          </div>
          <p className="text-xl font-bold text-blue-800">
            Submitting your request...
          </p>
        </div>
      )}
      <div className="flex w-full items-center justify-center">
        {step === 1 && (
          <Step1DepartmentService
            register={register}
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
        {/* Client has address on file and can use it or add new */}
        {step === 4 && (
          <Step4SelectAddress
            userProfile={userProfile}
            setSelectedAddress={setSelectedAddress}
            selectedAddress={selectedAddress}
            isNextDisabled={isNextDisabled}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        )}
        {/* Client adds new address or confirms address */}
        {step === 5 && (
          <Step5ContactInformation
            register={register}
            setValue={setValue}
            formValues={getValues()}
            selectedAddress={selectedAddress}
            userProfile={userProfile}
            prevStep={prevStep}
            nextStep={nextStep}
            isNextDisabled={isNextDisabled}
          />
        )}
        {step === 6 && (
          <Step6ConfirmAppointment
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
