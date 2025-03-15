export interface ServiceType {
  id: number;
  name: string;
}

export interface Department {
  id: number;
  name: string;
}

export interface ServiceTypesResponse {
  data: ServiceType[];
}

export interface DepartmentsResponse {
  data: Department[];
}

export interface Technician {
  first_name: string;
  last_name: string;
  technician_details: {
    department_id: number;
  };
}

export type TechniciansResponse = Technician[];

export type UserProfile = {
  first_name: string;
  last_name: string;
  email: string;
  address_line1: string | null;
  address_line2: string | null;
  city: string | null;
  postal_code: string | null;
  primary_phone: string | null;
  secondary_phone: string | null;
  state: string | null;
};
