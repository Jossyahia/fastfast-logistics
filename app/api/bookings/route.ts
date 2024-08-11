import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      pickupAddress,
      deliveryAddress,
      pickupDate,
      deliveryDate,
      pickupTime,
      deliveryTime,
      packageSize,
      packageDescription,
      isUrgent,
      pickupPhoneNumber,
      deliveryPhoneNumber,
      paymentMethod,
      route,
      price,
    } = body;

    const newBooking = await prisma.booking.create({
      data: {
        userId: session.user.id,
        pickupAddress,
        deliveryAddress,
        pickupDate: new Date(pickupDate),
        deliveryDate: new Date(deliveryDate),
        pickupTime,
        deliveryTime,
        packageSize,
        packageDescription,
        isUrgent,
        status: "PENDING",
        pickupPhoneNumber,
        deliveryPhoneNumber,
        paymentMethod,
        route,
        price: parseFloat(price),
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Booking created successfully",
        bookingId: newBooking.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create booking",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
