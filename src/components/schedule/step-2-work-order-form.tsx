"use client";

import { useEffect, useState, useRef } from "react";
import { DateTime } from "luxon";
import ScheduleWorkOrderCalendar from "./schedule-work-order-calendar";
import StepButtons from "./step-buttons";
import { Dialog } from "../ui/dialog";
import { formatDateLong } from "@/lib/utils";
import { EventClickArg } from "@fullcalendar/core/index.js";
import type { Timeslot } from "@/lib/types/work-order-types";
import TodaySelected from "./today-selected";
import TimeslotList from "./timeslot-list";
import NoTimesAvailable from "./no-times-avail";
import type { BackgroundEvent } from "./types/calendar.types";
import { UseFormSetValue } from "react-hook-form";
import { CreateWorkOrderInput } from "@/features/work-orders/schemas";

interface Step2SelectDateTimeProps {
  backgroundEvents: BackgroundEvent[];
  selectedDate: Date | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
  isTimeslotModalOpen: boolean;
  setIsTimeslotModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  allTimeslots: Timeslot[];
  setFilteredSlots: React.Dispatch<React.SetStateAction<Timeslot[]>>;
  filteredSlots: Timeslot[];
  step: number;
  prevStep: () => void;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setValue: UseFormSetValue<CreateWorkOrderInput>;
}

export default function Step2SelectDateTime({
  backgroundEvents,
  selectedDate,
  setSelectedDate,
  isTimeslotModalOpen,
  setIsTimeslotModalOpen,
  allTimeslots,
  setFilteredSlots,
  filteredSlots,
  step,
  prevStep,
  setStep,
  setValue,
}: Step2SelectDateTimeProps) {
  const [todaySelected, setTodaySelected] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const timeslotListRef = useRef<HTMLUListElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isTimeslotModalOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isTimeslotModalOpen]);

  useEffect(() => {
    if (timeslotListRef.current) {
      const isOverflowing =
        timeslotListRef.current.scrollHeight >
        timeslotListRef.current.clientHeight;
      setIsOverflowing(isOverflowing);
    }
  }, [filteredSlots]);

  const handleDateClick = (arg: { date: Date }) => {
    if (isProcessing) return;

    setIsProcessing(true);

    const clickedDate = DateTime.fromJSDate(arg.date, {
      zone: "America/Denver",
    }).toISODate();
    const todayDate = DateTime.now().setZone("America/Denver").toISODate();

    setTodaySelected(clickedDate === todayDate);

    const slots = allTimeslots.filter((slot: Timeslot) => {
      if (!slot.start) return false;

      const slotDate = DateTime.fromISO(slot.start, {
        zone: "America/Denver",
      }).toISODate();

      setTodaySelected(clickedDate === todayDate);

      return slotDate === clickedDate;
    });

    const sortedSlots = slots.sort((a, b) => {
      return (
        DateTime.fromISO(a.start).setZone("America/Denver").toMillis() -
        DateTime.fromISO(b.start).setZone("America/Denver").toMillis()
      );
    });

    setSelectedDate(
      DateTime.fromJSDate(arg.date, { zone: "America/Denver" }).toJSDate(),
    );
    setFilteredSlots(sortedSlots);
    setTimeout(() => {
      setIsTimeslotModalOpen(true);
      setIsProcessing(false);
    }, 100);
  };

  const handleEventClick = (info: EventClickArg) => {
    info.jsEvent.preventDefault();
  };

  const handleCloseTimeslotModal = () => {
    setIsTimeslotModalOpen(false);
    setValue("appointmentStart", "");
    setValue("appointmentEnd", "");
  };

  const handleSelectSlot = (slot: Timeslot) => {
    if (isProcessing) return;

    setIsProcessing(true);

    const startDateTime = DateTime.fromISO(slot.start).setZone(
      "America/Denver",
    );
    const endDateTime = DateTime.fromISO(slot.end).setZone("America/Denver");

    if (!startDateTime.isValid || !endDateTime.isValid) {
      console.error(
        "Invalid datetime selected:",
        startDateTime.invalidExplanation,
        endDateTime.invalidExplanation,
      );
      setIsProcessing(false);
      return;
    }

    const formattedStartUTC = startDateTime.toUTC().toISO();
    const formattedEndUTC = endDateTime.toUTC().toISO();

    setValue("appointmentStart", formattedStartUTC);
    setValue("appointmentEnd", formattedEndUTC);

    setIsTimeslotModalOpen(false);
    setIsProcessing(false);
    setStep(3);
  };

  return (
    <>
      <div
        aria-current={step === 2 ? "step" : undefined}
        className="flex flex-col items-center justify-center px-2 pb-2"
      >
        <h2 className="pb-1 text-center text-base font-semibold md:text-lg">
          Click on an available date highlighted in green:
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
            Use the buttons at the top of the calendar to navigate if needed.
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
        aria-labelledby="timeslot-modal-title"
        aria-describedby="timeslot-modal-desc"
      >
        <h2 id="timeslot-modal-title" className="sr-only">
          {selectedDate
            ? `Available timeslots for ${formatDateLong(selectedDate)}`
            : "Select an available timeslot"}
        </h2>
        <p id="timeslot-modal-desc" className="sr-only">
          Use arrow keys or touch gestures to scroll through the available time
          slots. Click a time slot to select it.
        </p>
        {todaySelected ? (
          <TodaySelected />
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
            <TimeslotList
              handleSelectSlot={handleSelectSlot}
              timeslotListRef={
                timeslotListRef as React.RefObject<HTMLUListElement>
              }
              filteredSlots={filteredSlots}
            />
          </>
        ) : (
          <NoTimesAvailable />
        )}
        <div className="flex justify-center">
          <StepButtons variant="prevOnly" prevStep={handleCloseTimeslotModal} />
        </div>
      </Dialog>
    </>
  );
}
