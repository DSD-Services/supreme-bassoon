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
  jobDetails: z.string().nullable(),
  appointmentNotes: z.string().nullable(),
  primaryPhone: z.string().min(9).max(14),
  secondaryPhone: z.string().min(9).max(14).nullable(),
  serviceAddress: z.object({
    addressLine1: z.string().min(1),
    addressLine2: z.string().min(1).nullable(),
    city: z.string().min(1),
    state: z.string().min(1),
    postalCode: z.string().min(1),
  }),
});

export const CreateWorkOrderSchema = WorkOrderSchema.omit({ clientId: true });

export type CreateWorkOrderInput = z.infer<typeof CreateWorkOrderSchema>;
