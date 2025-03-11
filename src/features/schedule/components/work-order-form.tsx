"use client";

import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EventClickArg } from "@fullcalendar/core/index.js";
import { Timeslot } from "../types/calendar.types";
import { backgroundEvents, availableTimeslots } from "../data/events";
import ScheduleWorkOrderCalendar from "./schedule-work-order-calendar";
import { ServiceType } from "../types/backend-data";

const workOrderSchema = z.object({
  technicianId: z.string(),
  serviceTypeId: z.string().min(1, "Service type is required"),
  departmentId: z.string().min(1, "Department is required"),
  status: z.enum(["pending", "in progress", "completed", "cancelled"]),
  appointmentStart: z.date(),
  appointmentEnd: z.date(),
  appointmentNotes: z.string(),
  addressLine1: z.string().min(1, "Address is required"),
  addressLine2: z.string(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  primaryPhone: z.string().min(1, "Primary phone is required"),
  secondaryPhone: z.string(),
});

// const clientDetailsSchema = z.object({
//   addressLine1: z.string().min(1, "Address is required"),
//   addressLine2: z.string(),
//   city: z.string().min(1, "City is required"),
//   state: z.string().min(1, "State is required"),
//   postalCode: z.string().min(1, "Postal code is required"),
//   primaryPhone: z.string().min(1, "Primary phone is required"),
//   secondaryPhone: z.string(),
// });

type WorkOrderFormData = z.infer<typeof workOrderSchema>;
// type ClientDetailsFormData = z.infer<typeof clientDetailsSchema>;

export default function ScheduleWorkOrderForm() {
  const [userDetails, setUserDetails] = useState<ClientDetailsFormData | null>(
    null,
  );
  const [step, setStep] = useState(1);
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [filteredSlots, setFilteredSlots] = useState<Timeslot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Timeslot | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(workOrderSchema),
  });

  const {
    register: registerClientDetails,
    handleSubmit: handleSubmitClientDetails,
    formSate: { error: clientDetailsErrors },
  } = useForm<ClientDetailsFormData>({
    resolver: zodResolver(clientDetailsSchema),
  });

  const departmentId = watch("workOrder.departmentId");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch("/api/client/details");
        if (!response.ok) throw new Error("Failed to fetch client details");

        const data = await response.json();
        setUserDetails(data);
        setValue("firstName", data.firstName || "");
        setValue("lastName", data.lastName || "");
        setValue("addressLine1", data.addressLine1 || "");
        setValue("addressLine2", data.addressLine2 || "");
        setValue("city", data.city || "");
        setValue("state", data.state || "");
        setValue("postalCode", data.postalCode || "");
        setValue("primaryPhone", data.primaryPhone || "");
        setValue("secondaryPhone", data.secondaryPhone || "");
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [setValue]);

  useEffect(() => {
    if (!departmentId) return;

    const fetchTechnicians = async () => {
      try {
        const response = await fetch(
          `/api/technicians/by-department${departmentId}`,
        );
        if (!response.ok) throw new Error("Failed to fetch technicians");

        const { data } = await response.json();
        if (data.length > 0) {
          setValue("technicianId", data[0].id);
        }
      } catch (error) {
        console.error("Error fetching technicians:", error);
      }
    };
    fetchTechnicians();
  }, [departmentId, setValue]);

  useEffect(() => {
    if (!departmentId) return;

    const fetchServiceTypes = async () => {
      const response = await fetch(
        `/api/services/by-department/${departmentId}`,
      );
      const serviceTypesData = await response.json();

      if (serviceTypesData.length > 0) {
        setServiceTypes(serviceTypesData);
      }
    };

    fetchServiceTypes();
  }, [departmentId]);

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

  const handleSelectSlot = (slot: Timeslot) => {
    console.log("Timeslot clicked:", slot);
    setSelectedSlot(slot);
    setStep(3);
  };

  const onSubmit: SubmitHandler<WorkOrderFormData> = (data) => {
    console.log("Submitting:", data);
  };

  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {step === 1 && (
        <>
          <h2>Step 1: Select Department & Service</h2>
          <label htmlFor="departmentId">Department</label>
          <input
            id="departmentId"
            placeholder="--Please select one--"
            {...register("departmentId")}
          />
          {errors.departmentId && <span>{errors.departmentId.message}</span>}
          <label htmlFor="serviceTypeId">Service Type</label>
          <select id="serviceTypeId" {...register("serviceTypeId")}>
            <option value="">Select a Service</option>
            {serviceTypes.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
          {errors.serviceTypeId && <span>{errors.serviceTypeId.message}</span>}
        </>
      )}
      {step === 2 && (
        <>
          <h2>Step 2: Select an Available Date</h2>
          <ScheduleWorkOrderCalendar
            backgroundEvents={backgroundEvents}
            handleDateClick={handleDateClick}
            handleEventClick={handleEventClick}
          />
          <div>
            <button type="button" onClick={prevStep}>
              Back
            </button>
            <button type="button" onClick={nextStep}>
              Next
            </button>
          </div>
        </>
      )}
      {step === 3 && (
        <>
          <h2>Step 3: Select an Available Timeslot</h2>
          <div>
            <button type="button" onClick={prevStep}>
              Back
            </button>
            <button type="button" onClick={nextStep}>
              Next
            </button>
          </div>
        </>
      )}
      {step === 4 && (
        <>
          <h2>Step 4: Enter Your Contact Details</h2>
          <div>
            <button type="button" onClick={prevStep}>
              Back
            </button>
            <button type="button" onClick={nextStep}>
              Next
            </button>
          </div>
        </>
      )}
      {step === 5 && (
        <>
          <h2>Step 5 - (Final Step): Confirm Your Appointment</h2>
          <div>
            <button type="button" onClick={prevStep}>
              Back
            </button>
          </div>
          <button type="submit">Confirm Appointment</button>
        </>
      )}
    </form>
  );
}

// {
/* <>
  <h2>Step 3: Confirm Appointment</h2>
  <label htmlFor="appointmentStart">Appointment Start</label>
  <input
    type="datetime-local"
    {...register("appointmentStart", { valueAsDate: true })}
  />
  {errors.appointmentStart && <span>{errors.appointmentStart.message}</span>}

  <label htmlFor="appointmentEnd">Appointment End</label>
  <input
    type="datetime-local"
    {...register("appointmentEnd", { valueAsDate: true })}
  />
  {errors.appointmentEnd && <span>{errors.appointmentEnd.message}</span>}

  <label htmlFor="appointmentNotes">Appointment Notes</label>
  <textarea {...register("appointmentNotes")} />
  {errors.appointmentNotes && <span>{errors.appointmentNotes.message}</span>}

  <button type="button" onClick={prevStep}>
    Back
  </button>
  <button type="submit">Submit</button>
</>; */
// }
