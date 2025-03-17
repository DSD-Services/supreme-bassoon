import { Database } from "./database.types";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type TechnicianDetail =
  Database["public"]["Tables"]["technician_details"]["Row"];
export type Department = Database["public"]["Tables"]["departments"]["Row"];
export type WorkOrder = Database["public"]["Tables"]["work_orders"]["Row"];
export type ServiceType = Database["public"]["Tables"]["service_types"]["Row"];
export type Part = Database["public"]["Tables"]["parts"]["Row"];
export type ReservedPart =
  Database["public"]["Tables"]["reserved_parts"]["Row"];
export type MissingPart = Database["public"]["Tables"]["missing_parts"]["Row"];
export type ServiceTypePart =
  Database["public"]["Tables"]["service_type_parts"]["Row"];

export type UserRole = Database["public"]["Enums"]["userrole"];
export type WorkDay = Database["public"]["Enums"]["workday"];
export type WorkOrderStatus = Database["public"]["Enums"]["workorderstatus"];

//

export type HydratedWorkOrder = WorkOrder & {
  client: Profile;
  technician: Profile;
  department: Department;
  reserved_parts: Array<ReservedPart & { part: Part }>;
  service_type: ServiceType;
  service_type_parts: {
    service_type_parts: Array<ServiceTypePart & { part: Part }>;
  };
};

export type ProfileWithTechnicianDetails = Profile & {
  technician_details:
    | (TechnicianDetail & { departments: Department | null })
    | null;
};
