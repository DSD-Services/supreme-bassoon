import { capitalize } from "@/lib/utils";
import { z } from "zod";

export const RegisterSchema = z
  .object({
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
    password: z
      .string({ required_error: "Please enter your password." })
      .min(6, "Your password must have 6 characters or more."),
    confirmPassword: z.string({
      required_error: "Please enter your password.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "The two passwords do not match.",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof RegisterSchema>;
