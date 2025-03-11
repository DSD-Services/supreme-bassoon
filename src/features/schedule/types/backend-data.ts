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
