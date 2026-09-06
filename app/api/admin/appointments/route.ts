import { NextRequest, NextResponse } from "next/server";
import { readData } from "@/lib/data";
import { Appointment } from "@/lib/booking";

export async function GET(req: NextRequest) {
  const appointments = readData<Appointment[]>("appointments", []);
  return NextResponse.json({ appointments });
}
