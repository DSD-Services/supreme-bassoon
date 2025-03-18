"use client";

import { useEffect, useState, useRef } from "react";
import ScheduleWorkOrderCalendar from "./schedule-work-order-calendar";
import StepButtons from "./step-buttons";
import { Dialog } from "../ui/dialog";
import { formatDateLong } from "@/lib/utils";
import { EventClickArg } from "@fullcalendar/core/index.js";
import { Timeslot } from "@/lib/types/work-order-types";
import TodaySelected from "./today-selected";
import TimeslotList from "./timeslot-list";
import NoTimesAvailable from "./no-times-avail";
import { BackgroundEvent } from "./types/calendar.types";
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
  prevStep,
  setStep,
  setValue,
}: Step2SelectDateTimeProps) {
  const [todaySelected, setTodaySelected] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const timeslotListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (timeslotListRef.current) {
      const isOverflowing =
        timeslotListRef.current.scrollHeight >
        timeslotListRef.current.clientHeight;
      setIsOverflowing(isOverflowing);
    }
  }, [filteredSlots]);

  const handleDateClick = (arg: { date: Date }) => {
    const clickedDate = arg.date.toISOString().split("T")[0];
    const todayDate = new Date().toISOString().split("T")[0];

    if (clickedDate === todayDate) {
      setTodaySelected(true);
    } else {
      setTodaySelected(false);
    }

    const slots = allTimeslots.filter((slot: Timeslot) => {
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

  const handleEventClick = (info: EventClickArg) => {
    info.jsEvent.preventDefault();
  };

  const handleCloseTimeslotModal = () => {
    setIsTimeslotModalOpen(false);
    setValue("appointmentStart", "");
    setValue("appointmentEnd", "");
  };

  const handleSelectSlot = (slot: Timeslot) => {
    setValue("appointmentStart", slot.start);
    setValue("appointmentEnd", slot.end);
    setIsTimeslotModalOpen(false);
    setStep(3);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center px-2 pb-2">
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
      >
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
