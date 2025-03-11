// TODO -- onSubmit will need to be typed like the form data
// TODO -- verify that required fields are filled out and validated
//    before moving to next step of form

"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
import { backgroundEvents, availableTimeslots } from "../data/events";
import { EventClickArg } from "@fullcalendar/core/index.js";

export default function ScheduleWorkOrderForm() {
  const [step, setStep] = useState(1);
  const [departments, setDepartments] = useState<Department[] | []>([]);
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [departmentTechnicians, setDepartmentTechnicians] = useState<
    Technician[] | []
  >([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [filteredSlots, setFilteredSlots] = useState<Timeslot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Timeslot | null>(null);

  const {
    register,
    handleSubmit,
    getValues,
    onChange,
    formState: { errors },
    watch,
  } = useForm();

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
      console.log(
        "Watch department select from inside useEffect:",
        watchDepartmentSelect,
      );
      fetchTechnicians(watchDepartmentSelect);
    }
  }, [watchDepartmentSelect]);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleDateClick = (arg: { date: Date }) => {
    const clickedDate = arg.date.toISOString().split("T")[0];
    const slots = availableTimeslots.filter((slot) => {
      slot.start.startsWith(clickedDate);
    });

    setSelectedDate(arg.date);
    setFilteredSlots(slots);
    setStep(2);
  };

  const handleEventClick = (info: EventClickArg) => {
    info.jsEvent.preventDefault();
    console.log("Event clicked:", info.event.start);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-secondary mx-2 my-6 rounded-lg p-2 shadow-xl md:mx-4 lg:mx-10">
        {step === 1 && (
          <>
            <h2>Step 1: Select Department & Service</h2>
            <div className="flex flex-col pt-6">
              <label htmlFor="department">Department</label>
              <select
                {...register("departmentId", { required: true })}
                className="rounded-lg shadow-lg hover:cursor-pointer"
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
              <label htmlFor="serviceType">Service Type</label>
              <select
                {...register("serviceTypeId", { required: true })}
                className={`rounded-lg shadow-lg ${isDisabled ? "bg-slate-300 text-slate-600" : "bg-white hover:cursor-pointer"}`}
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
            <StepButtons type="nextOnly" nextStep={nextStep} />
          </>
        )}
        {step === 2 && (
          <div className="flex flex-col items-center justify-center py-6">
            <h2>Step 2: Select an available Date</h2>
            <div className="w-full max-w-[400px] rounded-lg bg-white p-2 shadow-lg md:mx-4 lg:mx-10">
              <ScheduleWorkOrderCalendar
                backgroundEvents={backgroundEvents}
                handleDateClick={handleDateClick}
                handleEventClick={handleEventClick}
              />
            </div>
            <StepButtons
              type="prevNext"
              prevStep={prevStep}
              nextStep={nextStep}
            />
          </div>
        )}
        {step === 3 && <div>You made it to step 3!</div>}
      </div>
    </form>
  );
}

{
  /* <button type="submit">Submit</button> */
}
