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
      department: {
        Row: {
          id: number
          name: string
          service_type_id: number[] | null
        }
        Insert: {
          id?: number
          name: string
          service_type_id?: number[] | null
        }
        Update: {
          id?: number
          name?: string
          service_type_id?: number[] | null
        }
        Relationships: []
      }
      missing_parts: {
        Row: {
          id: number
          part_id: number | null
          quantity: number
          work_order_id: number | null
        }
        Insert: {
          id?: number
          part_id?: number | null
          quantity: number
          work_order_id?: number | null
        }
        Update: {
          id?: number
          part_id?: number | null
          quantity?: number
          work_order_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "missing_parts_part_id_fkey"
            columns: ["part_id"]
            isOneToOne: false
            referencedRelation: "part"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "missing_parts_work_order_id_fkey"
            columns: ["work_order_id"]
            isOneToOne: false
            referencedRelation: "work_order"
            referencedColumns: ["work_order_id"]
          },
        ]
      }
      part: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      parts_inventory: {
        Row: {
          id: number
          part_id: number | null
          quantity: number
        }
        Insert: {
          id?: number
          part_id?: number | null
          quantity: number
        }
        Update: {
          id?: number
          part_id?: number | null
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "parts_inventory_part_id_fkey"
            columns: ["part_id"]
            isOneToOne: false
            referencedRelation: "part"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address_line1: string | null
          address_line2: string | null
          city: string | null
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
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
          first_name?: string | null
          id: string
          last_name?: string | null
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
          first_name?: string | null
          id?: string
          last_name?: string | null
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
          part_id: number | null
          quantity: number
          work_order_id: number | null
        }
        Insert: {
          id?: number
          part_id?: number | null
          quantity: number
          work_order_id?: number | null
        }
        Update: {
          id?: number
          part_id?: number | null
          quantity?: number
          work_order_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "reserved_parts_part_id_fkey"
            columns: ["part_id"]
            isOneToOne: false
            referencedRelation: "part"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reserved_parts_work_order_id_fkey"
            columns: ["work_order_id"]
            isOneToOne: false
            referencedRelation: "work_order"
            referencedColumns: ["work_order_id"]
          },
        ]
      }
      service_type: {
        Row: {
          service_type_id: number
          service_type_name: string
        }
        Insert: {
          service_type_id?: number
          service_type_name: string
        }
        Update: {
          service_type_id?: number
          service_type_name?: string
        }
        Relationships: []
      }
      service_type_parts: {
        Row: {
          part_id: number | null
          part_quantity: number
          service_type_id: number | null
          service_type_parts_id: number
        }
        Insert: {
          part_id?: number | null
          part_quantity: number
          service_type_id?: number | null
          service_type_parts_id?: number
        }
        Update: {
          part_id?: number | null
          part_quantity?: number
          service_type_id?: number | null
          service_type_parts_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "service_type_parts_part_id_fkey"
            columns: ["part_id"]
            isOneToOne: false
            referencedRelation: "part"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_type_parts_service_type_id_fkey"
            columns: ["service_type_id"]
            isOneToOne: false
            referencedRelation: "service_type"
            referencedColumns: ["service_type_id"]
          },
        ]
      }
      technician_details: {
        Row: {
          break_end_time: string | null
          break_start_time: string | null
          created_at: string
          id: string
          updated_at: string
          work_days: Database["public"]["Enums"]["workday"][] | null
          work_end_time: string | null
          work_start_time: string | null
        }
        Insert: {
          break_end_time?: string | null
          break_start_time?: string | null
          created_at?: string
          id: string
          updated_at?: string
          work_days?: Database["public"]["Enums"]["workday"][] | null
          work_end_time?: string | null
          work_start_time?: string | null
        }
        Update: {
          break_end_time?: string | null
          break_start_time?: string | null
          created_at?: string
          id?: string
          updated_at?: string
          work_days?: Database["public"]["Enums"]["workday"][] | null
          work_end_time?: string | null
          work_start_time?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "technician_details_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      work_order: {
        Row: {
          appointment_end_date_time: string
          appointment_notes: string | null
          appointment_start_date_time: string
          client_id: number
          department_id: number
          service_type_id: number
          status: string
          technician_id: number | null
          work_order_id: number
        }
        Insert: {
          appointment_end_date_time: string
          appointment_notes?: string | null
          appointment_start_date_time: string
          client_id: number
          department_id: number
          service_type_id: number
          status: string
          technician_id?: number | null
          work_order_id?: number
        }
        Update: {
          appointment_end_date_time?: string
          appointment_notes?: string | null
          appointment_start_date_time?: string
          client_id?: number
          department_id?: number
          service_type_id?: number
          status?: string
          technician_id?: number | null
          work_order_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "work_order_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "department"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_order_service_type_id_fkey"
            columns: ["service_type_id"]
            isOneToOne: false
            referencedRelation: "service_type"
            referencedColumns: ["service_type_id"]
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
