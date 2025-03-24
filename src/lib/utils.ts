import { DateTime } from "luxon";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(str: string) {
  if (!str) return "";
  return str.toLowerCase().charAt(0).toUpperCase() + str.slice(1);
}

export function formatTime(time: string) {
  const now = new Date();
  const [hours, minutes] = time.split(":");
  now.setHours(+hours, +minutes, 0, 0);
  return now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
}

export const formatDateTime = (dateTime: string | null) => {
  if (!dateTime) return { date: "", startTime: "", endTime: "" };

  const dt = DateTime.fromISO(dateTime, { zone: "utc" }).setZone(
    "America/Denver",
  );

  const dateFormat = dt.toLocaleString(DateTime.DATE_MED);
  const timeFormat = dt.toLocaleString(DateTime.TIME_SIMPLE);
  const startTime = timeFormat;
  const endTime = dt.plus({ hours: 1 }).toLocaleString(DateTime.TIME_SIMPLE);

  return {
    date: dateFormat,
    startTime,
    endTime,
  };
};

export function formatDateLong(date: Date): string {
  return DateTime.fromJSDate(date).toFormat("MMMM d, yyyy");
}
