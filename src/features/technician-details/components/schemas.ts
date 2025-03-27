import { z } from "zod";

export const ApptNotesSchema = z.object({
  appointmentNotes: z
    .string()
    .max(500, "Appointment notes must be 500 characters or fewer.")
    .optional(),
});

export type ApptNotesInput = z.infer<typeof ApptNotesSchema>;
