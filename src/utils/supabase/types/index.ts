import { Database } from "./database.types";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type TechnicianDetail =
  Database["public"]["Tables"]["technician_details"]["Row"];
export type Department = Database["public"]["Tables"]["departments"]["Row"];
export type WorkOrder = Database["public"]["Tables"]["work_orders"]["Row"];
export type ServiceType = Database["public"]["Tables"]["service_types"]["Row"];
export type Part = Database["public"]["Tables"]["parts"]["Row"];

export type UserRole = Database["public"]["Enums"]["userrole"];
export type WorkDay = Database["public"]["Enums"]["workday"];
