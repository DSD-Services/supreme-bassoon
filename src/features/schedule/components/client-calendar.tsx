"use client";

import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventClickArg } from "@fullcalendar/core/index.js";
import { backgroundEvents, availableTimeslots } from "../data/events";
import { Timeslot, WorkOrderStep } from "../types/calendar.types";

export default function ClientCalendar() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalStep, setModalStep] = useState<WorkOrderStep>("appointment");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [filteredSlots, setFilteredSlots] = useState<Timeslot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Timeslot | null>(null);

  const handleDateClick = (arg: { date: Date }) => {
    const clickedDate = arg.date.toISOString().split("T")[0];
    const slots = availableTimeslots.filter((slot) => {
      slot.start.startsWith(clickedDate);
    });

    setSelectedDate(arg.date);
    setFilteredSlots(slots);
    setModalStep("appointment");
    setShowModal(true);
  };

  const handleEventClick = (info: EventClickArg) => {
    info.jsEvent.preventDefault();
    console.log("Event clicked:", info.event.start);
  };

  const handleSelectSlot = (slot: Timeslot) => {
    console.log("Timeslot clicked:", slot);
    setSelectedSlot(slot);
    setModalStep("completeWorkOrder");
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedDate(null);
    setSelectedSlot(null);
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      eventSources={[
        {
          events: backgroundEvents,
          display: "background",
          backgroundColor: "#d4edda",
        },
      ]}
      initialView="dayGridMonth"
      validRange={(currentDate) => {
        const startDate = new Date(currentDate.valueOf());
        const endDate = new Date(currentDate.valueOf());

        startDate.setDate(startDate.getDate());
        endDate.setDate(endDate.getDate() + 28);

        return { start: startDate, end: endDate };
      }}
      dateClick={handleDateClick}
      eventClick={handleEventClick}
      eventInteractive={true}
      headerToolbar={{
        start: "today",
        center: "title",
        end: "prev,next",
      }}
      height={600}
    />
    {showModal && (
      <Modal handleClose={handleClose}>
        {modalStep === 'appointment' && (
          <AppointmentModalContent
            selectedDate={selectedDate}
            filteredSlots={filteredSlots}
            handleSelectSlot={handleSelectSlot}
          />
        )}
        {modalStep === 'completeWorkOrder' && (
          <WorkOrderModalContent />
        )}
        (modalStep === 'confirmation' && (
          <ConfirmationModalContent
            selectedSlot={selectedSlot}
            handleClose={handleClose}
          />
        ))
      </Modal>
    )}
  );
}
