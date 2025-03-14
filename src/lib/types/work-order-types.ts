export type WorkDay =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

export type Technician = {
  id: string;
  technician_details: {
    work_days: WorkDay[] | null;
    work_start_time: string | null;
    work_end_time: string | null;
    break_start_time: string | null;
    break_end_time: string | null;
  };
};

export type Appointment = {
  id: number;
  technician_id: string | null;
  appointment_start: string | null;
  appointment_end: string | null;
};

export type Timeslot = {
  id: number;
  start: string;
  end: string;
  extendedProps: {
    technicianId: string;
  };
};
