import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventClickArg } from "@fullcalendar/core/index.js";

interface ScheduleWorkOrderCalendarProps {
  backgroundEvents: [];
  handleDateClick: () => void;
  handleEventClick: () => void;
}

export default function ScheduleWorkOrderCalendar({
  backgroundEvents,
  handleDateClick,
  handleEventClick,
}: ScheduleWorkOrderCalendarProps) {
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
  );
}
