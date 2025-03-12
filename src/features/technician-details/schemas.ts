import { z } from "zod";

// CREATE TABLE technician_details (
//     id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL PRIMARY KEY,
//     created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
//     updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
//     work_start_time TIME,
//     work_end_time TIME,
//     work_days workday[],
//     break_start_time TIME,
//     break_end_time TIME,
//     department_id INT REFERENCES departments(id) ON DELETE SET NULL
//   );

export const TechnicianDetailsSchema = z.object({
  workStartTime: z.string().nullable(),
  workEndTime: z.string().nullable(),
  workDays: z
    .array(
      z.enum([
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
        "SUNDAY",
      ]),
    )
    .nullable(),
  breakStartTime: z.string().nullable(),
  breakEndTime: z.string().nullable(),
  departmentId: z.union([z.number(), z.string().transform(Number)]).nullable(),
});

export type TechnicianDetailsInput = z.infer<typeof TechnicianDetailsSchema>;
