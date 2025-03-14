import { APPOINTMENT_LEAD_TIME } from "../types/calendar.types";
import {
  Technician,
  Appointment,
  Timeslot,
  WorkDay,
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
      return;
    }

    const techAppointments = appointments.filter(
      (appt) => appt.technician_id === id,
    );

    for (let i = 0; i < APPOINTMENT_LEAD_TIME; i++) {
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      currentDate.setDate(currentDate.getDate() + i);

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (currentDate.getTime() === today.getTime()) {
        continue;
      }

      const dayOfWeek = currentDate.getDay();
      const workDay = dayOfWeekMap[dayOfWeek];
      if (!work_days?.includes(workDay)) continue;

      let startTime = new Date(
        currentDate.toISOString().slice(0, 10) + `T${work_start_time}`,
      );
      const endTime = new Date(
        currentDate.toISOString().slice(0, 10) + `T${work_end_time}`,
      );
      const breakStart = new Date(
        currentDate.toISOString().slice(0, 10) + `T${break_start_time}`,
      );
      const breakEnd = new Date(
        currentDate.toISOString().slice(0, 10) + `T${break_end_time}`,
      );

      const slotDuration = 60 * 60 * 1000;

      while (startTime < endTime) {
        const nextSlot = new Date(startTime.getTime() + slotDuration);

        if (
          (startTime >= breakStart && startTime < breakEnd) ||
          (nextSlot > breakStart && nextSlot <= breakEnd)
        ) {
          startTime = breakEnd;
          continue;
        }

        const isBooked = techAppointments.some((appt) => {
          if (!appt.appointment_start || !appt.appointment_end) {
            return false;
          }
          return (
            new Date(appt.appointment_start) < nextSlot &&
            new Date(appt.appointment_end) > startTime
          );
        });

        if (!isBooked) {
          timeslots.push({
            id: ++maxId,
            start: startTime.toISOString(),
            end: nextSlot.toISOString(),
            extendedProps: {
              technicianId: id,
            },
          });
        }

        startTime = nextSlot;
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
