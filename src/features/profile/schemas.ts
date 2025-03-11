import { z } from "zod";

// CREATE TABLE profiles (
//     id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL PRIMARY KEY,
//     created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
//     updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
//     role userrole NOT NULL,
//     first_name TEXT,
//     last_name TEXT,
//     address_line1 TEXT,
//     address_line2 TEXT,
//     city TEXT,
//     state TEXT,
//     postal_code TEXT,
//     primary_phone TEXT,
//     secondary_phone TEXT
//   );

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
