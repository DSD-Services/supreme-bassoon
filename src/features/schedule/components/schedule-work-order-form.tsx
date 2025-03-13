// TODO -- onSubmit will need to be typed like the form data
// TODO -- verify that required fields are filled out and validated
//    before moving to next step of form
// TODO -- render errors beneath inputs with error
//    message using React hook form

"use client";

import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Department,
  DepartmentsResponse,
  ServiceType,
  ServiceTypesResponse,
  Technician,
  TechniciansResponse,
} from "../types/backend-data";
import StepButtons from "./step-buttons";
import ScheduleWorkOrderCalendar from "./schedule-work-order-calendar";
import { backgroundEvents, availableTimeslots } from "../lib/events";
import { EventClickArg } from "@fullcalendar/core/index.js";
import { Timeslot } from "../types/calendar.types";
import { Dialog } from "@/components/ui/dialog";
import { useDialog } from "@/components/ui/use-dialog";
import { Button } from "@/components/ui/button";
import { formatDateLong } from "@/lib/utils";

export default function ScheduleWorkOrderForm() {
  const [step, setStep] = useState(1);
  const [departments, setDepartments] = useState<Department[] | []>([]);
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [isBackDisabled, setIsBackDisabled] = useState(false);
  const [departmentTechnicians, setDepartmentTechnicians] = useState<
    Technician[] | []
  >([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [filteredSlots, setFilteredSlots] = useState<Timeslot[]>([]);
  const [isTimeslotModalOpen, setIsTimeslotModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<Timeslot | null>(null);
  const [todaySelected, setTodaySelected] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    onChange,
    formState: { errors },
    watch,
  } = useForm();

  const { isOpen, openDialog, onClose } = useDialog();

  const watchDepartmentSelect = watch("departmentId");

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch("/api/departments");
        if (!response.ok) throw new Error("Failed to fetch departments");

        const departments: DepartmentsResponse = await response.json();
        const departmentsData = departments.data;
        const sortedDepartments = departmentsData.sort((a, b) =>
          a.name.localeCompare(b.name),
        );
        setDepartments(sortedDepartments);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  useEffect(() => {
    const fetchServiceTypes = async (departmentId: number) => {
      try {
        const response = await fetch(
          `/api/service-types/by-department/${departmentId}`,
        );
        if (!response.ok) throw new Error("Failed to fetch service types");

        const serviceTypes: ServiceTypesResponse = await response.json();
        setServiceTypes(serviceTypes.data);
      } catch (error) {
        console.error("Error fetching service types", error);
      }
    };

    if (watchDepartmentSelect) {
      setIsDisabled(false);
      fetchServiceTypes(watchDepartmentSelect);
    }
  }, [watchDepartmentSelect]);

  useEffect(() => {
    const fetchTechnicians = async (departmentId: number) => {
      try {
        const response = await fetch(
          `/api/technicians/by-department/${departmentId}`,
        );
        if (!response.ok) throw new Error("Failed to fetch technicians");

        const technicians: TechniciansResponse = await response.json();
        setDepartmentTechnicians(technicians);
      } catch (error) {
        console.error("Error fetching technicians", error);
      }
    };

    if (watchDepartmentSelect) {
      fetchTechnicians(watchDepartmentSelect);
    }
  }, [watchDepartmentSelect]);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => {
    if (step === 3) {
      setSelectedSlot(null);
    }
    setStep((prev) => prev - 1);
  };

  const handleDateClick = (arg: { date: Date }) => {
    const clickedDate = arg.date.toISOString().split("T")[0];
    const todayDate = new Date().toISOString().split("T")[0];

    if (clickedDate === todayDate) {
      setTodaySelected(true);
    } else {
      setTodaySelected(false);
    }

    const slots = availableTimeslots.filter((slot) =>
      slot.start.startsWith(clickedDate),
    );
    const sortedSlots = slots.sort(
      (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime(),
    );
    console.log("Arg.date:", arg.date);
    console.log("Clicked Date:", clickedDate);
    console.log("Time slots for date clicked", sortedSlots);
    setSelectedDate(arg.date);
    setFilteredSlots(sortedSlots);
    setIsTimeslotModalOpen(true);
  };

  const handleEventClick = (info: EventClickArg) => {
    info.jsEvent.preventDefault();
    console.log("Event clicked:", info.event.start);
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
    setStep(3);
  };

  // TODO - Create Work Order Form Data type
  const onSubmit: SubmitHandler<WorkOrderFormData> = (data) => {
    console.log("Submitting:", data);
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
              <select
                {...register("departmentId", { required: true })}
                className="rounded-lg border-r-10 border-transparent bg-white px-3 py-2 text-sm shadow-lg hover:cursor-pointer md:text-base"
              >
                <option value="">-- Please select a department --</option>
                {departments.map((department) => (
                  <option key={department.id} value={department.id}>
                    {department.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col pt-6">
              <label htmlFor="serviceType" className="text-sm text-blue-800">
                Service Type
              </label>
              <select
                {...register("serviceTypeId", { required: true })}
                className={`rounded-lg border-r-10 border-transparent px-3 py-2 text-sm shadow-lg md:text-base ${isDisabled ? "bg-slate-300 text-slate-600" : "bg-white hover:cursor-pointer"}`}
                disabled={isDisabled}
              >
                <option value="">-- Please select a service --</option>
                {serviceTypes.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
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
              <h2 className="pb-2 text-center text-lg font-semibold">
                Step 2: Select an available date and time
              </h2>
              <div className="mb-2 w-full max-w-[400px] rounded-lg bg-white p-2 shadow-lg md:mx-4 lg:mx-10">
                <ScheduleWorkOrderCalendar
                  backgroundEvents={backgroundEvents}
                  handleDateClick={handleDateClick}
                  handleEventClick={handleEventClick}
                />
              </div>
              <div className="flex flex-col items-center">
                <span className="text-base font-semibold italic">
                  Click on any date highlighted in green.
                </span>
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
                <ul className="pb-4">
                  {filteredSlots.map((slot: Timeslot) => (
                    <li
                      key={slot.id}
                      className="my-2 cursor-pointer rounded bg-blue-100 p-2 text-black hover:bg-blue-300"
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
        {step === 4 && (
          <div>
            <h2 className="flex pb-2 text-center text-lg font-semibold">
              Step 4: Confirm your contact information:
            </h2>
            <div className="flex justify-center gap-10">
              <StepButtons variant="prevOnly" prevStep={prevStep} />
              <Button type="submit">Submit</Button>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
