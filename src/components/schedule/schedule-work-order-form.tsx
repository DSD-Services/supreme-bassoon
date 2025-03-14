"use client";
// TODO -- onSubmit will need to be typed like the form data
// <WorkOrderFormData>
// TODO -- verify that required fields are filled out and validated
//    before moving to next step of form
// TODO -- render errors beneath inputs with error
//    message using React hook form
// TODO -- display dates in user timezone

import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import type { FormState } from "./types/form-state";
import type { Department, ServiceType } from "@/utils/supabase/types";
import type { BackgroundEvent } from "./types/calendar.types";
import type { Timeslot } from "@/lib/types/work-order-types";
import { groupTimeslotsByDay } from "./lib/generate-timeslots";
import { hasCompleteAddress } from "./lib/user-profile";
import { Profile } from "@/utils/supabase/types";
import Step2SelectDateTime from "./step-2-work-order-form";
import Step3ConfirmDateTime from "./step-3-work-order-form";
import Step4ContactInformation from "./step-4-work-order-form";
import Step5ConfirmAppointment from "./step-5-work-order-form";
import Step1DepartmentService from "./step-1-work-order-form";
// import { WorkOrderFormData } from "../types/zod-work-order-schema";

type ScheduleWorkOrderFormProps = {
  sortedDepartments: Department[];
  userProfile: PartialProfile;
};

type PartialProfile = Omit<
  Profile,
  "id" | "created_at" | "updated_at" | "role"
>;

export default function ScheduleWorkOrderForm({
  sortedDepartments: departments,
  userProfile: userProfile,
}: ScheduleWorkOrderFormProps) {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isNextDisabled] = useState(false);
  // const [isNextDisabled, setIsNextDisabled] = useState(false);
  // const [isBackDisabled, setIsBackDisabled] = useState(false);
  const [backgroundEvents, setBackgroundEvents] = useState<
    BackgroundEvent[] | []
  >([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [allTimeslots, setAllTimeslots] = useState<Timeslot[]>([]);
  const [filteredSlots, setFilteredSlots] = useState<Timeslot[]>([]);
  const [isTimeslotModalOpen, setIsTimeslotModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<Timeslot | null>(null);

  const { register, handleSubmit, reset, trigger, watch } = useForm<FormState>({
    defaultValues: {
      departmentId: "",
      serviceTypeId: "",
      selectedDate: "",
      selectedSlot: "",
      firstName: userProfile.first_name,
      lastName: userProfile.last_name,
      email: userProfile.email,
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      postalCode: "",
      primaryPhone: "",
      secondaryPhone: "",
    },
  });
  const formValues = watch();

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
      const hasAddressOnFile = hasCompleteAddress(userProfile);
      if (!hasAddressOnFile) {
        setStep(4);
      } else {
        setStep(5);
      }
    }
    if (step === 4) {
      const isValid = await trigger([
        "firstName",
        "lastName",
        "addressLine1",
        "city",
        "state",
        "postalCode",
        "primaryPhone",
      ]);
      if (!isValid) {
        toast.error("Please fill out all required fields.");
      } else {
        setStep(5);
      }
    }
  };
  const prevStep = () => {
    if (step === 3) {
      setSelectedSlot(null);
    }
    setStep((prev) => prev - 1);
  };

  useEffect(() => {
    if (isTimeslotModalOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [isTimeslotModalOpen]);

  const selectedDepartment = departments.find(
    (department) => department.id === +formValues.departmentId,
  );
  const selectedServiceType = serviceTypes.find(
    (serviceType) => serviceType.id === +formValues.serviceTypeId,
  );
  const departmentName = selectedDepartment?.name ?? "";
  const serviceTypeName = selectedServiceType?.name ?? "";

  const getProfileOrFormValue = (
    profileValue: string | null | undefined,
    formValue: string | undefined,
  ) => {
    return profileValue || formValue || "";
  };

  const combineProfileAndFormValues = (
    profile: PartialProfile,
    formValues: FormState,
    selectedDate: Date | null,
    selectedSlot: Timeslot | null,
  ) => {
    return {
      firstName: formValues.firstName || profile.first_name,
      lastName: formValues.lastName || profile.last_name,
      email: formValues.email || profile.email,
      addressLine1: formValues.addressLine1 || profile.address_line1,
      addressLine2: formValues.addressLine2 || profile.address_line2,
      city: formValues.city || profile.city,
      state: formValues.state || profile.state,
      postalCode: formValues.postalCode || profile.postal_code,
      primaryPhone: formValues.primaryPhone || profile.primary_phone,
      secondaryPhone: formValues.secondaryPhone || profile.secondary_phone,
      departmentId: formValues.departmentId,
      serviceTypeId: formValues.serviceTypeId,
      selectedDate: selectedDate,
      selectedSlot: selectedSlot,
    };
  };

  const onSubmit: SubmitHandler<FormState> = (formValues) => {
    const combinedValues = combineProfileAndFormValues(
      userProfile,
      formValues,
      selectedDate,
      selectedSlot,
    );
    console.log("Submitting:", combinedValues);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex min-h-[500px] justify-center"
    >
      <div className="my-2 flex h-1/2 w-11/12 justify-center rounded-lg bg-blue-100 pt-3 pb-6">
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
          />
        )}
        {step === 2 && (
          <Step2SelectDateTime
            backgroundEvents={backgroundEvents}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            isTimeslotModalOpen={isTimeslotModalOpen}
            setIsTimeslotModalOpen={setIsTimeslotModalOpen}
            setSelectedSlot={setSelectedSlot}
            allTimeslots={allTimeslots}
            setFilteredSlots={setFilteredSlots}
            filteredSlots={filteredSlots}
            prevStep={prevStep}
            setStep={setStep}
          />
        )}
        {step === 3 && (
          <Step3ConfirmDateTime
            selectedSlot={selectedSlot}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        )}
        {/* Client does not have address on file */}
        {step === 4 && (
          <Step4ContactInformation
            register={register}
            prevStep={prevStep}
            nextStep={nextStep}
            isNextDisabled={isNextDisabled}
          />
        )}
        {/* Client has address on file */}
        {step === 5 && (
          <Step5ConfirmAppointment
            userProfile={userProfile}
            getProfileOrFormValue={getProfileOrFormValue}
            formValues={formValues}
            departmentName={departmentName}
            serviceTypeName={serviceTypeName}
            selectedDate={selectedDate}
            selectedSlot={selectedSlot}
            prevStep={prevStep}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
          />
        )}
      </div>
    </form>
  );
}
