import { Json } from "@/utils/supabase/types/database.types";

export interface TechnicianDetails {
  break_end_time: string | null;
  break_start_time: string | null;
  created_at: string;
  department_id: number | null;
  id: string;
  updated_at: string;
  work_days:
    | (
        | "MONDAY"
        | "TUESDAY"
        | "WEDNESDAY"
        | "THURSDAY"
        | "FRIDAY"
        | "SATURDAY"
        | "SUNDAY"
      )[]
    | null;
  work_end_time: string | null;
  work_start_time: string | null;
}

export interface TechnicianSchedule {
  technicianDetails: TechnicianDetails;
  workOrders: TransformedWorkOrder[];
}

export interface BusinessHours {
  daysOfWeek: number[];
  startTime: string | null;
  endTime: string | null;
}

export interface BreakEvent {
  id: string | null;
  title: string;
  start: string | null;
  end: string | null;
  description: string;
  classNames: string[];
}

export interface CalendarWorkOrder {
  id: number;
  title: string;
  start: Date | string;
  end: Date | string;
  extendedProps: {
    department: string;
    serviceType: string;
    status: string;
    clientName: string;
    jobDetails: string;
    serviceAddress: {
      addressLine1: string | null;
      addressLine2?: string | null;
      city: string | null;
      state: string | null;
      postalCode: string | null;
    };
    primaryPhone: string;
    secondaryPhone?: string;
  };
}

export interface ServiceAddress {
  address_line1: string | null;
  address_line2?: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
}

interface TransformedWorkOrder {
  id: number;
  appointment_start: string | null;
  appointment_end: string | null;
  department_id: number;
  department_name: string;
  job_details: string | null;
  service_type_id: number;
  service_type_name: string;
  service_address: Json;
  client_id: string;
  client_name: string;
  primary_phone: string;
  secondary_phone: string | null;
  status: string;
}

export type SpecialWorkOrder = Omit<
  TransformedWorkOrder,
  "appointment_notes" | "technician_id"
> & {
  department_name: string;
  service_type_name: string;
  client_name: string;
};
