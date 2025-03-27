"use client";

import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { EventClickArg, EventSourceInput } from "@fullcalendar/core/index.js";
import { Dialog } from "@/components/ui/dialog";
import WorkOrderGroup from "@/components/dashboard/work-order-group";
import type { BusinessHours, BreakEvent, CalendarWorkOrder } from "../types";
import { formatDateLongWithWeekday } from "@/lib/utils";
interface TechnicianCalendarProps {
  businessHours: BusinessHours | null;
  breakEvents: BreakEvent[] | [];
  workOrders: CalendarWorkOrder[] | [];
}

export default function TechnicianCalendar({
  businessHours,
  breakEvents,
  workOrders,
}: TechnicianCalendarProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<CalendarWorkOrder | null>(null);
  const [isBreak, setIsBreak] = useState(false);

  const scheduledAppointments = [
    ...breakEvents.map((event) => ({ ...event, type: "break" })),
    ...workOrders.map((order) => ({ ...order, type: "workOrder" })),
  ];

  const handleClose = () => {
    setShowModal(false);
  };

  const handleEventClick = (info: EventClickArg) => {
    info.jsEvent.preventDefault();

    const appointmentType = info.event.extendedProps?.type;

    if (appointmentType === "break") {
      setIsBreak(true);
    } else {
      setIsBreak(false);
    }

    const appointment: CalendarWorkOrder = {
      id: Number(info.event.id),
      title: info.event.title,
      start: info.event.start ?? "",
      end: info.event.end ?? "",
      extendedProps: {
        department: info.event.extendedProps?.department || "",
        serviceType: info.event.extendedProps?.serviceType || "",
        status: info.event.extendedProps?.status || "",
        clientName: info.event.extendedProps?.clientName || "",
        jobDetails: info.event.extendedProps?.jobDetails || "",
        serviceAddress: {
          addressLine1:
            info.event.extendedProps?.serviceAddress?.addressLine1 || null,
          addressLine2:
            info.event.extendedProps?.serviceAddress?.addressLine2 || null,
          city: info.event.extendedProps?.serviceAddress?.city || null,
          state: info.event.extendedProps?.serviceAddress?.state || null,
          postalCode:
            info.event.extendedProps?.serviceAddress?.postalCode || "",
        },
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
              daysOfWeek: businessHours?.daysOfWeek || [],
              startTime: businessHours?.startTime || "",
              endTime: businessHours?.endTime || "",
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
                    {formatDateLongWithWeekday(
                      new Date(selectedAppointment.start),
                    )}
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
                        {
                          selectedAppointment.extendedProps.serviceAddress
                            .addressLine1
                        }
                        {selectedAppointment.extendedProps.serviceAddress
                          .addressLine2 && (
                          <span>
                            ,{" "}
                            {
                              selectedAppointment.extendedProps.serviceAddress
                                .addressLine2
                            }
                          </span>
                        )}
                        <br />
                        {
                          selectedAppointment.extendedProps.serviceAddress.city
                        },{" "}
                        {selectedAppointment.extendedProps.serviceAddress.state}{" "}
                        {
                          selectedAppointment.extendedProps.serviceAddress
                            .postalCode
                        }
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
