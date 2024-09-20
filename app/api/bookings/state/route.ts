// app/api/bookings/route.ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { auth } from "@/auth";

const bookingSchema = z.object({
  pickupAddress: z.string(),
  deliveryAddress: z.string(),
  pickupDate: z.string().transform((str) => new Date(str)),
  deliveryDate: z.string().transform((str) => new Date(str)),
  pickupTime: z.string(),
  deliveryTime: z.string(),
  packageSize: z.enum(["SMALL", "MEDIUM", "LARGE", "EXTRA_LARGE"]),
  packageDescription: z.string().optional(),
  isUrgent: z.boolean(),
  paymentMethod: z.enum(["CREDIT_CARD", "DEBIT_CARD", "CASH", "BANK_TRANSFER"]),
  route: z.string(),
  price: z.number(),
  pickupPhoneNumber: z.string(),
  deliveryPhoneNumber: z.string(),
});

function generateTrackingNumber() {
  return "Fls-Sap" + Math.random().toString(36).substr(2, 9).toUpperCase();
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validatedData = bookingSchema.parse(body);

    const result = await prisma.$transaction(async (prisma) => {
      // Create the booking
      const booking = await prisma.booking.create({
        data: {
          ...validatedData,
          userId: session.user.id,
          status: "PROCESSING",
          riderResponse: "PENDING",
        },
      });

      // Create the corresponding shipment
      const shipment = await prisma.shipment.create({
        data: {
          trackingNumber: generateTrackingNumber(),
          status: "PROCESSING",
          userId: session.user.id,
          bookingId: booking.id,
          estimatedDelivery: validatedData.deliveryDate,
        },
      });

      return { booking, shipment };
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error("Error creating booking and shipment:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
