"use client";
// TODO -- onSubmit will need to be typed like the form data
// <WorkOrderFormData>
// TODO -- verify that required fields are filled out and validated
//    before moving to next step of form
// TODO -- render errors beneath inputs with error
//    message using React hook form
// TODO -- display dates in user timezone

import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ScheduleWorkOrderCalendar from "./schedule-work-order-calendar";
import { EventClickArg } from "@fullcalendar/core/index.js";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn, formatDateLong } from "@/lib/utils";
import { Select } from "@/components/ui/select";
import { groupTimeslotsByDay } from "./lib/generate-timeslots";
import StepButtons from "./step-buttons";
import type { Department, ServiceType } from "@/utils/supabase/types";
import type { BackgroundEvent } from "./types/calendar.types";
import type { Timeslot } from "@/lib/types/work-order-types";
import toast from "react-hot-toast";
import { fetchServiceTypes, fetchTimeslots } from "./lib/work-order-queries";
import { hasCompleteAddress } from "./lib/user-profile";
import WorkOrderGroup from "../dashboard/work-order-group";
// import { UpdateProfileDialog } from "../admin/clients/update-profile-dialog";
import { Input } from "@/components/ui/input";
import { Profile } from "@/utils/supabase/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
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
  const [todaySelected, setTodaySelected] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);

  type FormState = {
    departmentId: string;
    serviceTypeId: string;
    selectedDate: string;
    selectedSlot: string;
    firstName: string;
    lastName: string;
    email: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    primaryPhone: string;
    secondaryPhone?: string;
  };

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

  const timeslotListRef = useRef<HTMLUListElement>(null);

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
      setStep(5);
    }
  };
  const prevStep = () => {
    if (step === 3) {
      setSelectedSlot(null);
    }
    setStep((prev) => prev - 1);
  };

  useEffect(() => {
    if (timeslotListRef.current) {
      const isOverflowing =
        timeslotListRef.current.scrollHeight >
        timeslotListRef.current.clientHeight;
      setIsOverflowing(isOverflowing);
    }
  }, [filteredSlots]);

  useEffect(() => {
    if (isTimeslotModalOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [isTimeslotModalOpen]);

  const handleEventClick = (info: EventClickArg) => {
    info.jsEvent.preventDefault();
    console.log("Event clicked:", info.event.start);
  };

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

  const selectedDepartment = departments.find(
    (department) => department.id === +formValues.departmentId,
  );
  const selectedServiceType = serviceTypes.find(
    (serviceType) => serviceType.id === +formValues.serviceTypeId,
  );

  const departmentName = selectedDepartment?.name ?? "";
  const serviceTypeName = selectedServiceType?.name ?? "";

  const handleDateClick = (arg: { date: Date }) => {
    const clickedDate = arg.date.toISOString().split("T")[0];
    const todayDate = new Date().toISOString().split("T")[0];

    if (clickedDate === todayDate) {
      setTodaySelected(true);
    } else {
      setTodaySelected(false);
    }

    console.log("Clicked Date:", clickedDate);

    const slots = allTimeslots.filter((slot) => {
      if (!slot.start) return false;
      const slotDate = new Date(slot.start);
      return (
        !isNaN(slotDate.getTime()) &&
        slotDate.toISOString().startsWith(clickedDate)
      );
    });

    const sortedSlots = slots.sort((a, b) => {
      return new Date(a.start).getTime() - new Date(b.start).getTime();
    });

    setSelectedDate(arg.date);
    setFilteredSlots(sortedSlots);
    setIsTimeslotModalOpen(true);
  };

  const handleReset = () => {
    reset({
      departmentId: "",
      serviceTypeId: "",
    });
    setIsDisabled(true);
    setServiceTypes([]);
  };

  const handleCloseTimeslotModal = () => {
    setIsTimeslotModalOpen(false);
    setSelectedSlot(null);
  };

  const handleSelectSlot = (slot: Timeslot) => {
    console.log("Timeslot clicked:", slot);
    setSelectedSlot(slot);
    setIsTimeslotModalOpen(false);
    setStep(3);
  };

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

  // TODO - Create Work Order Form Data type
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
                {departments.map((department) => (
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
                {serviceTypes.map((service) => (
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
        )}
        {step === 2 && (
          <>
            <div className="flex flex-col items-center justify-center px-2">
              <h2 className="pb-1 text-center text-lg font-semibold">
                Step 2: Click on an available date highlighted in green
              </h2>
              <div className="mb-2 w-full max-w-[400px] rounded-lg bg-white p-2 shadow-lg md:mx-4 lg:mx-10">
                <ScheduleWorkOrderCalendar
                  backgroundEvents={backgroundEvents}
                  handleDateClick={handleDateClick}
                  handleEventClick={handleEventClick}
                />
              </div>
              <div className="flex flex-col items-center">
                <span className="block pb-2 text-sm italic">
                  Use the buttons at the top of the calendar to navigate if
                  needed.
                </span>

                <StepButtons variant="prevOnly" prevStep={prevStep} />
              </div>
            </div>
            <Dialog
              isOpen={isTimeslotModalOpen}
              onClose={handleCloseTimeslotModal}
              title={
                selectedDate
                  ? formatDateLong(selectedDate)
                  : "Select an available timeslot"
              }
            >
              {todaySelected ? (
                <div className="pb-4 text-center">
                  <span className="font-medium">You selected today.</span>
                  <span className="block">
                    If you need a same-day appointment,{" "}
                    <span className="block">
                      please call our office to check availability.
                    </span>
                  </span>
                </div>
              ) : filteredSlots.length > 0 ? (
                <>
                  <span className="block text-center text-lg font-semibold">
                    Select an available timeslot
                  </span>
                  {isOverflowing && (
                    <span className="block pb-2 text-center text-sm italic">
                      Scroll to see more available times
                    </span>
                  )}
                  <ul
                    ref={timeslotListRef}
                    className="inner-shadow mb-6 max-h-72 overflow-y-auto pb-4"
                  >
                    {filteredSlots.map((slot: Timeslot) => (
                      <li
                        key={slot.id}
                        className="mx-4 my-2 cursor-pointer rounded bg-blue-100 p-2 text-black hover:bg-blue-300"
                        onClick={() => handleSelectSlot(slot)}
                      >
                        {new Date(slot.start).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                        -{" "}
                        {new Date(slot.end).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <div className="pb-4">
                  <span className="block text-center text-black">
                    Unfortunately, no times are available on this day.
                  </span>
                  <span className="block text-center">
                    Please go back and select another day.
                  </span>
                </div>
              )}
              <div className="flex justify-center">
                <StepButtons
                  variant="prevOnly"
                  prevStep={handleCloseTimeslotModal}
                />
              </div>
            </Dialog>
          </>
        )}
        {step === 3 && (
          <div className="flex flex-col items-center justify-center px-2">
            <h2 className="flex pb-2 text-center text-lg font-semibold">
              Step 3: Confirm selected appointment time:
            </h2>
            {selectedSlot && (
              <div className="pb-6 text-center">
                <div className="rounded-md bg-white p-4">
                  <span className="block font-semibold text-blue-800">
                    Selected Time:
                  </span>
                  <span className="block text-lg font-medium">
                    {formatDateLong(new Date(selectedSlot.start))}
                  </span>
                  <span className="block text-lg font-medium">
                    {new Date(selectedSlot.start).toLocaleTimeString([], {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}{" "}
                    -{" "}
                    {new Date(selectedSlot.end).toLocaleTimeString([], {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </span>
                </div>
                <p className="pt-4 italic">
                  If the date and time above look correct, please proceed to the
                  next step.
                </p>
                <p className="italic">
                  If not, please go back and select a different date or time.
                </p>
              </div>
            )}
            <StepButtons
              variant="prevNext"
              prevStep={prevStep}
              nextStep={nextStep}
            />
          </div>
        )}
        {/* Client does not have address on file */}
        {step === 4 && (
          <div className="flex flex-col items-center">
            <h2 className="flex pb-2 text-center text-lg font-semibold">
              Step 4: Enter your contact information:
            </h2>
            <div className="rounded-md bg-white px-6 pt-4 pb-6">
              <div className="mb-6 space-y-2">
                <div className="flex gap-2">
                  <div className="flex w-1/2 flex-col">
                    <label htmlFor="firstName" className="text-sm">
                      First Name *
                    </label>
                    <Input
                      type="text"
                      id="firstName"
                      {...register("firstName")}
                    />
                  </div>
                  <div className="flex w-1/2 flex-col">
                    <label htmlFor="lastName" className="text-sm">
                      Last Name *
                    </label>
                    <Input
                      type="text"
                      id="lastName"
                      {...register("lastName", { required: true })}
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="addressLine1" className="text-sm">
                    Address Line 1 *
                  </label>
                  <Input
                    type="text"
                    id="addressLine1"
                    {...register("addressLine1", { required: true })}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="addressLine2" className="text-sm">
                    Address Line 2
                  </label>
                  <Input
                    type="text"
                    id="addressLine2"
                    {...register("addressLine2")}
                  />
                </div>
                <div className="flex gap-2">
                  <div className="flex w-1/2 flex-col">
                    <label htmlFor="city" className="text-sm">
                      City *
                    </label>
                    <Input
                      type="text"
                      id="city"
                      {...register("city", { required: true })}
                    />
                  </div>
                  <div className="flex w-1/2 flex-col">
                    <label htmlFor="state" className="text-sm">
                      State *
                    </label>
                    <Input
                      type="text"
                      id="state"
                      {...register("state", { required: true })}
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="postalCode" className="text-sm">
                    Postal Code *
                  </label>
                  <Input
                    type="text"
                    id="postalCode"
                    {...register("postalCode", { required: true })}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="primaryPhone" className="text-sm">
                    Primary Phone *
                  </label>
                  <Input
                    type="text"
                    id="primaryPhone"
                    {...register("primaryPhone", { required: true })}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="secondaryPhone" className="text-sm">
                    Secondary Phone
                  </label>
                  <Input
                    type="text"
                    id="secondaryPhone"
                    {...register("secondaryPhone")}
                  />
                </div>
              </div>
              <div className="flex justify-center gap-10">
                <StepButtons
                  variant="prevNext"
                  prevStep={prevStep}
                  nextStep={nextStep}
                  isNextDisabled={isNextDisabled}
                />
              </div>
            </div>
          </div>
        )}
        {/* Client has address on file */}
        {step === 5 && (
          <div>
            <h2 className="flex pb-2 text-center text-lg font-semibold">
              Step 4: Confirm your appointment information:
            </h2>
            <div className="mb-6 flex flex-col gap-3 rounded-lg bg-white px-6 py-4">
              <WorkOrderGroup labelText="Name">
                {userProfile.first_name} {userProfile.last_name}
              </WorkOrderGroup>
              <WorkOrderGroup labelText="Address">
                <span>
                  {getProfileOrFormValue(
                    userProfile.address_line1,
                    formValues.addressLine1,
                  )}
                </span>
                {getProfileOrFormValue(
                  userProfile.address_line2,
                  formValues.addressLine2,
                ) && (
                  <span>
                    {getProfileOrFormValue(
                      userProfile.address_line2,
                      formValues.addressLine2,
                    )}
                  </span>
                )}
                <div>
                  <span>
                    {getProfileOrFormValue(userProfile.city, formValues.city)},
                  </span>{" "}
                  <span>
                    {getProfileOrFormValue(userProfile.state, formValues.state)}
                  </span>{" "}
                  <span>
                    {getProfileOrFormValue(
                      userProfile.postal_code,
                      formValues.postalCode,
                    )}
                  </span>
                </div>
              </WorkOrderGroup>
              <WorkOrderGroup labelText="Primary Phone">
                {getProfileOrFormValue(
                  userProfile.primary_phone,
                  formValues.primaryPhone,
                )}
              </WorkOrderGroup>
              {getProfileOrFormValue(
                userProfile.secondary_phone,
                formValues.secondaryPhone,
              ) && (
                <WorkOrderGroup labelText="Secondary Phone">
                  {getProfileOrFormValue(
                    userProfile.secondary_phone,
                    formValues.secondaryPhone,
                  )}
                </WorkOrderGroup>
              )}
              <WorkOrderGroup labelText="Department">
                {departmentName}
              </WorkOrderGroup>
              <WorkOrderGroup labelText="Service Type">
                {serviceTypeName}
              </WorkOrderGroup>
              {selectedSlot && (
                <>
                  <WorkOrderGroup labelText="Date">
                    {formatDateLong(new Date(selectedSlot.start))}
                  </WorkOrderGroup>
                  <WorkOrderGroup labelText="Time">
                    {new Date(selectedSlot.start).toLocaleTimeString([], {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}{" "}
                    -{" "}
                    {new Date(selectedSlot.end).toLocaleTimeString([], {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </WorkOrderGroup>
                </>
              )}
            </div>
            {/* TODO - redirect after successful submission */}
            <div className="flex justify-center gap-10">
              <StepButtons variant="prevOnly" prevStep={prevStep} />
              <Button type="submit">
                Submit <FontAwesomeIcon icon={faCircleCheck} />
              </Button>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
