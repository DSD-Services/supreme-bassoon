import { z } from "zod";

export const WorkOrderSchema = z.object({
  client_id: z.string().uuid(),
  technician_id: z.string().uuid(),
  service_type_id: z.number().int().positive(),
  department_id: z.number().int().positive(),
  status: z
    .enum(["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED"])
    .default("PENDING"),
  appointment_start: z.string().datetime(),
  appointment_end: z.string().datetime(),
  appointment_notes: z.string().nullable(),
  service_address: z.object({
    address_line_1: z.string(),
    address_line_2: z.string().nullable(),
    city: z.string(),
    state: z.string(),
    postal_code: z.string(),
  }),
});

export type WorkOrderInput = z.infer<typeof WorkOrderSchema>;
