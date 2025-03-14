export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      department_service_types: {
        Row: {
          department_id: number
          service_type_id: number
        }
        Insert: {
          department_id: number
          service_type_id: number
        }
        Update: {
          department_id?: number
          service_type_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "department_service_types_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "department_service_types_service_type_id_fkey"
            columns: ["service_type_id"]
            isOneToOne: false
            referencedRelation: "service_types"
            referencedColumns: ["id"]
          },
        ]
      }
      departments: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: never
          name: string
        }
        Update: {
          id?: never
          name?: string
        }
        Relationships: []
      }
      missing_parts: {
        Row: {
          id: number
          part_id: number
          quantity: number
          work_order_id: number | null
        }
        Insert: {
          id?: never
          part_id: number
          quantity?: number
          work_order_id?: number | null
        }
        Update: {
          id?: never
          part_id?: number
          quantity?: number
          work_order_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "missing_parts_part_id_fkey"
            columns: ["part_id"]
            isOneToOne: false
            referencedRelation: "parts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "missing_parts_work_order_id_fkey"
            columns: ["work_order_id"]
            isOneToOne: false
            referencedRelation: "work_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      parts: {
        Row: {
          id: number
          name: string
          quantity: number
        }
        Insert: {
          id?: never
          name: string
          quantity?: number
        }
        Update: {
          id?: never
          name?: string
          quantity?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address_line1: string | null
          address_line2: string | null
          city: string | null
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          postal_code: string | null
          primary_phone: string | null
          role: Database["public"]["Enums"]["userrole"]
          secondary_phone: string | null
          state: string | null
          updated_at: string
        }
        Insert: {
          address_line1?: string | null
          address_line2?: string | null
          city?: string | null
          created_at?: string
          email: string
          first_name: string
          id: string
          last_name: string
          postal_code?: string | null
          primary_phone?: string | null
          role: Database["public"]["Enums"]["userrole"]
          secondary_phone?: string | null
          state?: string | null
          updated_at?: string
        }
        Update: {
          address_line1?: string | null
          address_line2?: string | null
          city?: string | null
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          postal_code?: string | null
          primary_phone?: string | null
          role?: Database["public"]["Enums"]["userrole"]
          secondary_phone?: string | null
          state?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      reserved_parts: {
        Row: {
          id: number
          part_id: number
          quantity: number
          work_order_id: number | null
        }
        Insert: {
          id?: never
          part_id: number
          quantity?: number
          work_order_id?: number | null
        }
        Update: {
          id?: never
          part_id?: number
          quantity?: number
          work_order_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "reserved_parts_part_id_fkey"
            columns: ["part_id"]
            isOneToOne: false
            referencedRelation: "parts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reserved_parts_work_order_id_fkey"
            columns: ["work_order_id"]
            isOneToOne: false
            referencedRelation: "work_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      service_type_parts: {
        Row: {
          id: number
          part_id: number
          quantity: number
          service_type_id: number | null
        }
        Insert: {
          id?: never
          part_id: number
          quantity?: number
          service_type_id?: number | null
        }
        Update: {
          id?: never
          part_id?: number
          quantity?: number
          service_type_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "service_type_parts_part_id_fkey"
            columns: ["part_id"]
            isOneToOne: false
            referencedRelation: "parts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_type_parts_service_type_id_fkey"
            columns: ["service_type_id"]
            isOneToOne: false
            referencedRelation: "service_types"
            referencedColumns: ["id"]
          },
        ]
      }
      service_types: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: never
          name: string
        }
        Update: {
          id?: never
          name?: string
        }
        Relationships: []
      }
      technician_details: {
        Row: {
          break_end_time: string | null
          break_start_time: string | null
          created_at: string
          department_id: number | null
          id: string
          updated_at: string
          work_end_time: string | null
          work_start_time: string | null
        }
        Insert: {
          break_end_time?: string | null
          break_start_time?: string | null
          created_at?: string
          department_id?: number | null
          id: string
          updated_at?: string
          work_end_time?: string | null
          work_start_time?: string | null
        }
        Update: {
          break_end_time?: string | null
          break_start_time?: string | null
          created_at?: string
          department_id?: number | null
          id?: string
          updated_at?: string
          work_end_time?: string | null
          work_start_time?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "technician_details_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "technician_details_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      work_orders: {
        Row: {
          appointment_end: string | null
          appointment_notes: string | null
          appointment_start: string | null
          client_id: string
          department_id: number
          id: number
          service_address: Json
          service_type_id: number
          status: Database["public"]["Enums"]["workorderstatus"]
          technician_id: string
        }
        Insert: {
          appointment_end?: string | null
          appointment_notes?: string | null
          appointment_start?: string | null
          client_id: string
          department_id: number
          id?: never
          service_address: Json
          service_type_id: number
          status?: Database["public"]["Enums"]["workorderstatus"]
          technician_id: string
        }
        Update: {
          appointment_end?: string | null
          appointment_notes?: string | null
          appointment_start?: string | null
          client_id?: string
          department_id?: number
          id?: never
          service_address?: Json
          service_type_id?: number
          status?: Database["public"]["Enums"]["workorderstatus"]
          technician_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "work_orders_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_orders_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_orders_service_type_id_fkey"
            columns: ["service_type_id"]
            isOneToOne: false
            referencedRelation: "service_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_orders_technician_id_fkey"
            columns: ["technician_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      userrole: "CLIENT" | "TECHNICIAN" | "ADMIN"
      workday:
        | "MONDAY"
        | "TUESDAY"
        | "WEDNESDAY"
        | "THURSDAY"
        | "FRIDAY"
        | "SATURDAY"
        | "SUNDAY"
      workorderstatus: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
