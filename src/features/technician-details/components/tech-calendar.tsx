"use client";

import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { scheduledAppointments } from "@/components/schedule/lib/events";
import { EventClickArg, EventSourceInput } from "@fullcalendar/core/index.js";
import { Dialog } from "@/components/ui/dialog";
import WorkOrderGroup from "@/components/dashboard/work-order-group";

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

export default function TechnicianCalendar() {
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [isBreak, setIsBreak] = useState(false);

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
