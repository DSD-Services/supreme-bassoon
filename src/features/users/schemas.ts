import { capitalize } from "@/lib/utils";
import { z } from "zod";

export const AdminCreateUserSchema = z.object({
  firstName: z
    .string({ required_error: "Please enter your first name." })
    .min(1, "Please enter your first name.")
    .transform(capitalize),
  lastName: z
    .string({ required_error: "Please enter your last name." })
    .min(1, "Please enter your last name.")
    .transform(capitalize),
  email: z
    .string({ required_error: "Please enter your email." })
    .email("The email address is badly formatted.")
    .toLowerCase(),
  role: z.enum(["CLIENT", "TECHNICIAN"]),
  departmentId: z.coerce.number().int().positive().optional(),
});

export type AdminCreateUserInput = z.infer<typeof AdminCreateUserSchema>;
