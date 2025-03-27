import { TechnicianDetail } from "@/utils/supabase/types";

export function TransformBusinessHours(technicianDetails: TechnicianDetail) {
  if (!technicianDetails) return null;

  const dayMapping: Record<string, number> = {
    SUNDAY: 0,
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6,
  };

  const daysOfWeek = technicianDetails.work_days
    ? technicianDetails.work_days
        .map((day: string) => dayMapping[day])
        .filter((day: number | undefined) => day !== undefined)
    : [];

  return {
    daysOfWeek: daysOfWeek,
    startTime: technicianDetails.work_start_time || "",
    endTime: technicianDetails.work_end_time || "",
  };
}
