export interface Timeslot {
  title: string;
  start: Date | string;
  end: Date | string;
  id: number;
}

export interface Appointment {
  title: string;
  start: Date | string;
  end: Date | string;
  id: number;
  extendedProps: {
    department: string;
    serviceType: string;
    technician: string;
    customerName: string;
  };
}

export type WorkOrderStep =
  | "appointment"
  | "completeWorkOrder"
  | "confirmation";

export interface BackgroundEvent {
  id: string;
  start: string;
  end: string;
  display: "background";
  classNames?: string[];
}
