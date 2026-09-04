import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { readData, writeData } from "@/lib/data";
import {
  Appointment,
  BookingSettings,
  isSlotAvailable,
} from "@/lib/booking";

const bookingSchema = z.object({
  name: z.string().min(2),
  phone: z.string().regex(/^\+?[\d\s-]+$/),
  email: z.string().email().optional(),
  whatsapp: z.string().optional(),
  country: z.string().min(2),
  treatmentInterest: z.string().min(3),
  preferredDate: z.string().date(),
  preferredTime: z.string(),
  consultationType: z.enum(["in-person", "online"]),
  platform: z.string().optional(),
  notes: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = bookingSchema.parse(body);

    const settings = readData<BookingSettings>(
      "booking-settings",
      {
        availableDays: [1, 2, 3, 4, 5, 6],
        timeSlots: [
          "8:00 AM",
          "9:00 AM",
          "10:00 AM",
          "11:00 AM",
          "12:00 PM",
          "2:00 PM",
          "3:00 PM",
          "4:00 PM",
          "5:00 PM",
        ],
        maxPerSlot: 3,
        advanceBookingDays: 30,
        blockedDates: [],
      }
    );

    const appointments = readData<Appointment[]>("appointments", []);

    if (
      !isSlotAvailable(
        validated.preferredDate,
        validated.preferredTime,
        settings,
        appointments
      )
    ) {
      return NextResponse.json(
        { error: "Slot not available" },
        { status: 400 }
      );
    }

    const appointment: Appointment = {
      id: `apt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...validated,
      status: "pending",
      createdAt: new Date().toISOString(),
      whatsappSent: false,
    };

    appointments.push(appointment);
    writeData("appointments", appointments);

    // Send WhatsApp notification (simplified)
    // TODO: Integrate WhatsApp API

    return NextResponse.json({ ok: true, appointmentId: appointment.id });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Invalid request" },
      { status: 400 }
    );
  }
}
