import { z } from "zod";

const WorkOrderSchema = z.object({
  clientId: z.string().uuid(),
  technicianId: z.string().uuid(),
  serviceTypeId: z
    .union([z.string(), z.number()])
    .refine((val) => val !== "" && val !== null && val !== undefined, {
      message: "Service type is required.",
    })
    .pipe(z.coerce.number().int().positive()),
  departmentId: z
    .union([z.string(), z.number()])
    .refine((val) => val !== "" && val !== null && val !== undefined, {
      message: "Department is required.",
    })
    .pipe(z.coerce.number().int().positive()),
  appointmentStart: z.string().datetime(),
  appointmentEnd: z.string().datetime(),
  jobDetails: z.string().nullable(),
  appointmentNotes: z.string().nullable(),
  primaryPhone: z.string().min(9, "Primary phone is required").max(14),
  secondaryPhone: z
    .string()
    .min(9)
    .max(14)
    .or(z.literal("").transform(() => null))
    .nullable(),
  serviceAddress: z.object({
    addressLine1: z.string().min(1, "Address line 1 is required"),
    addressLine2: z
      .string()
      .trim()
      .transform((val) => (val === "" ? null : val))
      .nullable(),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    postalCode: z.string().min(1, "Postal code is required"),
  }),
});

export const CreateWorkOrderSchema = WorkOrderSchema.omit({ clientId: true });

export type CreateWorkOrderInput = z.infer<typeof CreateWorkOrderSchema>;
