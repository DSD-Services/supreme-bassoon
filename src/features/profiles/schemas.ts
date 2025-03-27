import { z } from "zod";

export const ProfileSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  addressLine1: z.string().nullable(),
  addressLine2: z.string().nullable(),
  city: z.string().nullable(),
  state: z.string().nullable(),
  postalCode: z.string().nullable(),
  primaryPhone: z.string().nullable(),
  secondaryPhone: z.string().nullable(),
  role: z.enum(["CLIENT", "ADMIN", "TECHNICIAN"]),
});

export type ProfileInput = z.infer<typeof ProfileSchema>;
