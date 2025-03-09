import { Database } from "./database.types";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type TechnicianDetail =
  Database["public"]["Tables"]["technician_details"]["Row"];

export type UserRole = Database["public"]["Enums"]["userrole"];
export type WorkDay = Database["public"]["Enums"]["workday"];
