import {
  Technician,
  Appointment,
  Timeslot,
} from "@/lib/types/work-order-types";
import { APPOINTMENT_LEAD_TIME } from "../types/calendar.types";

export function generateTimeslots(
  technicians: Technician[],
  appointments: Appointment[],
  existingIds: number[],
) {
  const timeslots: Timeslot[] = [];
  let maxId = existingIds.length > 0 ? Math.max(...existingIds) : 0;

  // const startDate = new Date();

  technicians.forEach((tech) => {
    const { id, technician_details } = tech;
    const {
      work_days,
      work_start_time,
      work_end_time,
      break_start_time,
      break_end_time,
    } = technician_details;

    const techAppointments = appointments.filter(
      (appt) => appt.technician_id === id,
    );

    work_days.forEach((day) => {
      for (let i = 0; i < APPOINTMENT_LEAD_TIME; i++) {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        currentDate.setDate(currentDate.getDate() + i);

        if (!work_days.includes(day)) {
          continue;
        }

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

          const isBooked = techAppointments.some(
            (appt) =>
              new Date(appt.start_time) < nextSlot &&
              new Date(appt.end_time) > startTime,
          );

          if (!isBooked) {
            maxId++;
            timeslots.push({
              id: maxId,
              start: startTime.toISOString().slice(0, 19),
              end: nextSlot.toISOString().slice(0, 19),
              extendedProps: {
                technicianId: id,
              },
            });
          }

          startTime = nextSlot;
        }
      }
    });
  });

  return timeslots;
}
