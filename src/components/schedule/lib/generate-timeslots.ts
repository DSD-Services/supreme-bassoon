import { DateTime } from "luxon";
import type { WorkDay } from "@/utils/supabase/types";
import { APPOINTMENT_LEAD_TIME } from "../types/calendar.types";
import type {
  Technician,
  Appointment,
  Timeslot,
} from "@/lib/types/work-order-types";

const dayOfWeekMap: { [key: number]: WorkDay } = {
  0: "SUNDAY",
  1: "MONDAY",
  2: "TUESDAY",
  3: "WEDNESDAY",
  4: "THURSDAY",
  5: "FRIDAY",
  6: "SATURDAY",
};

export function generateTimeslots(
  technicians: Technician[],
  appointments: Appointment[],
  existingIds: number[],
) {
  const timeZone = "America/Denver";
  const timeslots: Timeslot[] = [];
  let maxId = existingIds.length > 0 ? Math.max(...existingIds) : 0;

  technicians.forEach((tech) => {
    const { id, technician_details } = tech;
    const {
      work_days,
      work_start_time,
      work_end_time,
      break_start_time,
      break_end_time,
    } = technician_details;

    if (
      !work_start_time ||
      !work_end_time ||
      !break_start_time ||
      !break_end_time
    ) {
      console.warn(`Technician ${id} has missing time data. Skipping.`);
      return;
    }

    const workStart = DateTime.fromISO(work_start_time, {
      zone: timeZone,
    }).toUTC();
    const workEnd = DateTime.fromISO(work_end_time, {
      zone: timeZone,
    }).toUTC();
    const breakStart = DateTime.fromISO(break_start_time, {
      zone: timeZone,
    }).toUTC();
    const breakEnd = DateTime.fromISO(break_end_time, {
      zone: timeZone,
    }).toUTC();

    if (
      !workStart.isValid ||
      !workEnd.isValid ||
      !breakStart.isValid ||
      !breakEnd.isValid
    ) {
      console.error(`Invalid time conversion for technician ${id}. Skipping.`);
      return;
    }

    const techAppointments = appointments.filter(
      (appt) => appt.technician_id === id,
    );

    for (let i = 0; i < APPOINTMENT_LEAD_TIME; i++) {
      const currentDate = DateTime.now().plus({ days: i }).startOf("day");
      if (i === 0) continue;

      const workDay = dayOfWeekMap[currentDate.weekday % 7];
      if (!work_days?.includes(workDay)) continue;

      let startTime = DateTime.fromISO(
        `${currentDate.toISODate()}T${work_start_time}`,
        { zone: timeZone },
      ).toUTC();
      const endTime = DateTime.fromISO(
        `${currentDate.toISODate()}T${work_end_time}`,
        { zone: timeZone },
      ).toUTC();
      const breakStart = DateTime.fromISO(
        `${currentDate.toISODate()}T${break_start_time}`,
        { zone: timeZone },
      ).toUTC();
      const breakEnd = DateTime.fromISO(
        `${currentDate.toISODate()}T${break_end_time}`,
        { zone: timeZone },
      ).toUTC();

      let failsafeCounter = 0;
      const maxIterations = 24;

      while (startTime < endTime && failsafeCounter < maxIterations) {
        const nextSlot = startTime.plus({ hours: 1 });

        if (
          (startTime >= breakStart && startTime < breakEnd) ||
          (nextSlot > breakStart && nextSlot <= breakEnd)
        ) {
          startTime = breakEnd;
          continue;
        }

        const isBooked = techAppointments.some((appt) => {
          if (!appt.appointment_start || !appt.appointment_end) return false;

          const apptStart = DateTime.fromISO(appt.appointment_start, {
            zone: "utc",
          }).toMillis();
          const apptEnd = DateTime.fromISO(appt.appointment_end, {
            zone: "utc",
          }).toMillis();
          const slotStart = startTime.toMillis();
          const slotEnd = nextSlot.toMillis();

          return apptStart < slotEnd && apptEnd > slotStart;
        });

        if (!isBooked) {
          timeslots.push({
            id: ++maxId,
            start: startTime.toISO() || "",
            end: nextSlot.toISO() || "",
            extendedProps: { technicianId: id },
          });
        }

        startTime = nextSlot;
        failsafeCounter++;
      }

      if (failsafeCounter >= maxIterations) {
        console.error(
          `Possible infinite loop detected for technician ${id} on ${currentDate.toISODate()}`,
        );
      }
    }
  });

  return timeslots;
}

export function groupTimeslotsByDay(timeslots: Timeslot[]) {
  if (timeslots.length === 0) return [];

  const grouped: { [key: string]: { id: string; start: string; end: string } } =
    {};

  timeslots.forEach(({ start }) => {
    const date = start.slice(0, 10);
    if (!grouped[date]) {
      grouped[date] = {
        id: `bg-${date}`,
        start: date,
        end: new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10),
      };
    }
  });

  return Object.values(grouped);
}
