import FullCalendar from "@fullcalendar/react";
import luxonPlugin from "@fullcalendar/luxon3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventClickArg } from "@fullcalendar/core/index.js";
import { BackgroundEvent } from "./types/calendar.types";
import { APPOINTMENT_LEAD_TIME } from "./types/calendar.types";

interface ScheduleWorkOrderCalendarProps {
  backgroundEvents: BackgroundEvent[];
  handleDateClick: (arg: { date: Date }) => void;
  handleEventClick: (info: EventClickArg) => void;
}

export default function ScheduleWorkOrderCalendar({
  backgroundEvents,
  handleDateClick,
  handleEventClick,
}: ScheduleWorkOrderCalendarProps) {
  return (
    <FullCalendar
      timeZone="America/Denver"
      plugins={[luxonPlugin, dayGridPlugin, interactionPlugin]}
      eventSources={[
        {
          events: backgroundEvents,
          display: "background",
          backgroundColor: "#05df72",
        },
      ]}
      titleFormat={"LLLL yyyy"}
      initialView="dayGridMonth"
      validRange={(currentDate) => {
        const startDate = new Date(currentDate.valueOf());
        const endDate = new Date(currentDate.valueOf());

        startDate.setDate(startDate.getDate());
        endDate.setDate(endDate.getDate() + APPOINTMENT_LEAD_TIME);

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
      height={500}
    />
  );
}
