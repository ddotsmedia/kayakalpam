import { readData, writeData } from "./data";

export interface Appointment {
  id: string;
  name: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  country: string;
  treatmentInterest: string;
  preferredDate: string;
  preferredTime: string;
  consultationType: "in-person" | "online";
  platform?: string;
  notes?: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  createdAt: string;
  confirmedAt?: string;
  whatsappSent: boolean;
  waUrl?: string;
}

export type BookingSettings = {
  availableDays: number[];
  timeSlots: string[];
  maxPerSlot: number;
  advanceBookingDays: number;
  blockedDates: string[];
};

export function isSlotAvailable(
  date: string,
  time: string,
  settings: BookingSettings,
  appointments: Appointment[]
): boolean {
  const dateObj = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Past date check
  if (dateObj < today) return false;
  
  // Future limit check
  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + settings.advanceBookingDays);
  if (dateObj > maxDate) return false;
  
  // Day of week check (0=Sun, 1-6=Mon-Sat)
  const dayOfWeek = dateObj.getDay();
  if (!settings.availableDays.includes(dayOfWeek)) return false;
  
  // Blocked dates check
  if (settings.blockedDates.includes(date)) return false;
  
  // Slot capacity check
  const booked = appointments.filter(
    (a) =>
      a.preferredDate === date &&
      a.preferredTime === time &&
      (a.status === "pending" || a.status === "confirmed")
  ).length;
  
  return booked < settings.maxPerSlot;
}

export function getAvailableSlots(
  date: string,
  settings: BookingSettings,
  appointments: Appointment[]
): string[] {
  return settings.timeSlots.filter((time) =>
    isSlotAvailable(date, time, settings, appointments)
  );
}

export function generateWhatsAppUrl(appointment: Appointment): string {
  const text = `New booking: ${appointment.name} on ${appointment.preferredDate} at ${appointment.preferredTime}. Treatment: ${appointment.treatmentInterest}. Phone: ${appointment.phone}. Type: ${appointment.consultationType}`;
  return `https://wa.me/919447412319?text=${encodeURIComponent(text)}`;
}
