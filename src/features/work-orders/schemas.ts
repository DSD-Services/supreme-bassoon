import { z } from "zod";

const WorkOrderSchema = z.object({
  clientId: z.string().uuid(),
  technicianId: z.string().uuid(),
  serviceTypeId: z
    .union([z.string(), z.number()])
    .pipe(z.coerce.number().int().positive()),
  departmentId: z
    .union([z.string(), z.number()])
    .pipe(z.coerce.number().int().positive()),
  appointmentStart: z.string().datetime(),
  appointmentEnd: z.string().datetime(),
  appointmentNotes: z.string().nullable(),
  serviceAddress: z.object({
    addressLine1: z.string(),
    addressLine2: z.string().nullable(),
    city: z.string(),
    state: z.string(),
    postalCode: z.string(),
  }),
});

export const CreateWorkOrderSchema = WorkOrderSchema.omit({ clientId: true });

export type CreateWorkOrderInput = z.infer<typeof CreateWorkOrderSchema>;
