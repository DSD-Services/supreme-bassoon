import { DateTime } from "luxon";
import { BreakEvent, TechnicianDetails } from "../types";

function getNextDateForWeekday(
  weekday: string,
  referenceDate: DateTime,
): DateTime {
  const daysOfWeek: {
    [key in
      | "SUNDAY"
      | "MONDAY"
      | "TUESDAY"
      | "WEDNESDAY"
      | "THURSDAY"
      | "FRIDAY"
      | "SATURDAY"]: number;
  } = {
    SUNDAY: 0,
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6,
  };

  const targetDay =
    daysOfWeek[weekday.toUpperCase() as keyof typeof daysOfWeek];
  const diff = targetDay - referenceDate.weekday;

  const nextDate = referenceDate.plus({ days: diff >= 0 ? diff : diff + 7 });

  return nextDate;
}

export async function generateBreakEvents(
  technicianDetails: TechnicianDetails,
): Promise<BreakEvent[]> {
  const today = DateTime.now().setZone("America/Denver");
  const pastRangeStart = today.minus({ days: 30 });
  const futureRangeEnd = today.plus({ days: 30 });

  const createBreakEvent = (
    workDay: DateTime,
    breakStart: string,
    breakEnd: string,
  ) => {
    const breakStartDateTime = DateTime.fromISO(
      `${workDay.toISODate()}T${breakStart}`,
      {
        zone: "America/Denver",
      },
    );
    const breakEndDateTime = DateTime.fromISO(
      `${workDay.toISODate()}T${breakEnd}`,
      {
        zone: "America/Denver",
      },
    );

    if (!breakStartDateTime.isValid || !breakEndDateTime.isValid) {
      console.error("Invalid DateTime:", workDay, breakStart, breakEnd);
      return null;
    }

    return {
      id: breakStartDateTime.toISO(),
      title: "Break",
      start: breakStartDateTime.toISO(),
      end: breakEndDateTime.toISO(),
      description: "Break",
      classNames: ["break-event"],
    };
  };

  const breakEvents: BreakEvent[] = [];
  const workDays = technicianDetails.work_days;

  if (!workDays || workDays.length === 0) {
    return [];
  }

  for (const workDay of workDays) {
    let currentDate = getNextDateForWeekday(workDay, pastRangeStart);

    while (currentDate <= futureRangeEnd) {
      const break_start_time = technicianDetails.break_start_time;
      const break_end_time = technicianDetails.break_end_time;

      if (!break_start_time || !break_end_time) {
        return [];
      }

      const breakEvent = createBreakEvent(
        currentDate,
        break_start_time,
        break_end_time,
      );

      if (breakEvent) {
        breakEvents.push(breakEvent);
      }

      currentDate = getNextDateForWeekday(
        workDay,
        currentDate.plus({ days: 1 }),
      );
    }
  }

  return breakEvents;
}
