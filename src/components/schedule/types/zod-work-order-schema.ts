import { z } from "zod";

// Define your Zod schema
export const workOrderSchema = z.object({
  serviceTypeId: z.string().min(1, "Service type is required"),
  departmentId: z.string().min(1, "Department is required"),
  selectedDate: z.string().min(1, "Please select a date"),
  selectedTime: z.string().min(1, "Please select a time"),
  technicianId: z.string().min(1, "Technician assignment failed"),
  primaryPhone: z
    .string()
    .regex(/^\d{10}$/, "Invalid phone number, must be 10 digits"),
  secondaryPhone: z
    .string()
    .regex(/^\d{10}$/, "Invalid phone number, must be 10 digits"),
  customerEmail: z.string().email("Invalid email format"),
  notes: z.string().optional(),
});

// This ensures that TypeScript knows what the form data will look like
export type WorkOrderFormData = z.infer<typeof workOrderSchema>;

// Need to change  the data entries above to match what we need

// work_orders (client_id, technician_id, service_type_id, department_id, status, appointment_start, appointment_end, appointment_notes)

// need to also add client address since they might not have entered it in their profile -- or check for it first and populate? and if not there then they need to enter

// const workOrderSchema = z.object({
//   technicianId: z.string(),
//   serviceTypeId: z.string().min(1, "Service type is required"),
//   departmentId: z.string().min(1, "Department is required"),
//   status: z.enum(["pending", "in progress", "completed", "cancelled"]),
//   appointmentStart: z.date(),
//   appointmentEnd: z.date(),
//   appointmentNotes: z.string(),
//   addressLine1: z.string().min(1, "Address is required"),
//   addressLine2: z.string(),
//   city: z.string().min(1, "City is required"),
//   state: z.string().min(1, "State is required"),
//   postalCode: z.string().min(1, "Postal code is required"),
//   primaryPhone: z.string().min(1, "Primary phone is required"),
//   secondaryPhone: z.string(),
// });
