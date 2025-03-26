"use client";

import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { scheduledAppointments } from "@/components/schedule/lib/events";
import { EventClickArg, EventSourceInput } from "@fullcalendar/core/index.js";
import { Dialog } from "@/components/ui/dialog";
import WorkOrderGroup from "@/components/dashboard/work-order-group";
import { findTechnicianSchedule, findTechnicianAppointments } from "../queries";

export interface Appointment {
  title: string;
  start: Date | string;
  end: Date | string;
  id: number;
  extendedProps: {
    department: string;
    serviceType: string;
    technician: string;
    clientName: string;
    serviceAddress: string;
    primaryPhone: string;
    secondaryPhone: string;
  };
}

type Event = {
  id: string;
  title: string;
  start: string;
  end: string;
  description?: string;
  classNames?: string[];
  extendedProps?: Record<string, []>;
};

export default function TechnicianCalendar({ technicianId }: { technicianId: string }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [isBreak, setIsBreak] = useState(false);
   const [events, setEvents] = useState<Event[]>([]);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleEventClick = (info: EventClickArg) => {
    info.jsEvent.preventDefault();

    const appointment: Appointment = {
      id: Number(info.event.id),
      title: info.event.title,
      start: info.event.start ?? "",
      end: info.event.end ?? "",
      extendedProps: {
        department: info.event.extendedProps?.department || "",
        serviceType: info.event.extendedProps?.serviceType || "",
        technician: info.event.extendedProps?.technician || "",
        clientName: info.event.extendedProps?.customerName || "",
        serviceAddress: info.event.extendedProps?.customerAddress || "",
        primaryPhone: info.event.extendedProps?.primaryPhone || "",
        secondaryPhone: info.event.extendedProps?.secondaryPhone || "",
      },
    };
    const lowercaseTitle = appointment.title.toLowerCase();
    if (lowercaseTitle === "break") {
      setIsBreak(true);
    } else {
      setIsBreak(false);
    }
    setSelectedAppointment(appointment);
    setShowModal(true);
    
  };

   useEffect(() => {
    async function loadData() {
      if (!technicianId) return;

      try {
        // Fetch work days, work hours, and breaks
        const schedule = await findTechnicianSchedule(technicianId);

        if (schedule) {
          const workDays = schedule.work_days || [];
          const workHours = schedule.work_hours || [];
          const breaks = schedule.breaks || [];

          // Convert work days, work hours, and breaks to calendar events
          const scheduleEvents: Event[] = workDays.map((day) => ({
            id: `work-${day}`,
            title: "Work Day",
            start: day.start,
            end: day.end,
            classNames: ["work-day"],
          }));

          const breakEvents: Event[] = breaks.map((brk) => ({
            id: `break-${brk.start}`,
            title: "Break",
            start: brk.start,
            end: brk.end,
            description: "Break",
            classNames: ["break-event"],
          }));

          // Fetch appointments
          const appointments = await findTechnicianAppointments(technicianId);

          const appointmentEvents: Event[] =
            appointments?.map((appointment) => ({
              id: appointment.id,
              title: appointment.job_details,
              start: appointment.appointment_start,
              end: appointment.appointment_end,
              extendedProps: {
                departmentId: appointment.department_id,
                serviceTypeId: appointment.service_type_id,
              },
            })) || [];

          setEvents([...scheduleEvents, ...breakEvents, ...appointmentEvents]);
        }
      } catch (error) {
        console.error("Error loading calendar data:", error);
      }
    }

    loadData();
  }, [technicianId]);

  return (
    <div>
      <div className="flex justify-center bg-blue-50 p-2">
        <div className="h-auto max-h-[750px] w-full bg-white p-2 md:p-4 md:pt-2 lg:p-8 lg:pt-2">
          <FullCalendar
            plugins={[timeGridPlugin]}
            initialView="timeGridWeek"
            headerToolbar={{
              left: "prev,next",
              center: "title",
              right: "timeGridWeek,timeGridDay",
            }}
            events={scheduledAppointments as EventSourceInput}
            eventClick={handleEventClick}
            eventInteractive={true}
            businessHours={{
              daysOfWeek: [1, 2, 3, 4, 5], // Monday - Thursday (Note: 0 = Sunday, 1 = Monday, etc.)
              startTime: "08:00",
              endTime: "17:00",
            }}
            height={500}
          />
          {showModal && (
            <Dialog
              onClose={handleClose}
              title="Appointment Summary"
              isOpen={showModal}
            >
              {selectedAppointment ? (
                <div className="flex flex-col gap-3">
                  <WorkOrderGroup labelText="Date">
                    {new Date(selectedAppointment.start).toDateString()}
                  </WorkOrderGroup>
                  <WorkOrderGroup labelText="Time">
                    {new Date(selectedAppointment.start).toLocaleTimeString(
                      [],
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      },
                    )}{" "}
                    -{" "}
                    {new Date(selectedAppointment.end).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </WorkOrderGroup>
                  {isBreak ? (
                    <span className="text-base font-medium">BREAK TIME</span>
                  ) : (
                    <>
                      <WorkOrderGroup labelText="Service Type">
                        {selectedAppointment.extendedProps.serviceType}
                      </WorkOrderGroup>
                      <WorkOrderGroup labelText="Client Name">
                        <span className="block">
                          {selectedAppointment.extendedProps.clientName}
                        </span>
                      </WorkOrderGroup>
                      <WorkOrderGroup labelText="Service Address">
                        {selectedAppointment.extendedProps.serviceAddress}
                      </WorkOrderGroup>
                      <WorkOrderGroup labelText="Client Primary Phone">
                        {selectedAppointment.extendedProps.primaryPhone}
                      </WorkOrderGroup>
                      {selectedAppointment.extendedProps.secondaryPhone && (
                        <WorkOrderGroup labelText="Client Secondary Phone">
                          {selectedAppointment.extendedProps.secondaryPhone}
                        </WorkOrderGroup>
                      )}
                    </>
                  )}
                </div>
              ) : (
                <p className="text-black">
                  Appointment information not available.
                </p>
              )}
            </Dialog>
          )}
        </div>
      </div>
    </div>
  );
}
