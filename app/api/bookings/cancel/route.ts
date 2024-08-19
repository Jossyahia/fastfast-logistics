import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

function isValidDate(date: any): boolean {
  return date instanceof Date && !isNaN(date.getTime());
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { bookingId } = body;

    if (!bookingId) {
      return NextResponse.json(
        { error: "Booking ID is required" },
        { status: 400 }
      );
    }

    // Use a transaction to update both booking and shipment
    const result = await prisma.$transaction(async (prisma) => {
      // Fetch the booking to ensure it exists and belongs to the user
      const booking = await prisma.booking.findUnique({
        where: {
          id: bookingId,
          userId: session.user.id,
        },
        include: { shipment: true }, // Include the associated shipment
      });

      if (!booking) {
        throw new Error("Booking not found or not authorized");
      }

      // Check if the booking is in a cancellable state
      if (booking.status !== "PROCESSING" && booking.status !== "SHIPPED") {
        throw new Error("Booking cannot be cancelled in its current state");
      }

      const now = new Date();
      const pickupDate = isValidDate(booking.pickupDate)
        ? booking.pickupDate
        : now;
      const deliveryDate = isValidDate(booking.deliveryDate)
        ? booking.deliveryDate
        : now;

      // Update the booking
      const updatedBooking = await prisma.booking.update({
        where: { id: bookingId },
        data: {
          status: "CANCELLED",
          updatedAt: now,
          pickupDate: pickupDate,
          deliveryDate: deliveryDate,
        },
      });

      // Update the associated shipment if it exists
      let updatedShipment = null;
      if (booking.shipment) {
        updatedShipment = await prisma.shipment.update({
          where: { id: booking.shipment.id },
          data: {
            status: "CANCELLED",
            updatedAt: now,
            estimatedDelivery: isValidDate(booking.shipment.estimatedDelivery)
              ? booking.shipment.estimatedDelivery
              : null,
          },
        });
      }

      return { updatedBooking, updatedShipment };
    });

    return NextResponse.json({
      message: "Booking and shipment cancelled successfully",
      booking: result.updatedBooking,
      shipment: result.updatedShipment,
    });
  } catch (error) {
    console.error("Error cancelling booking:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to cancel booking",
      },
      { status: 500 }
    );
  }
}
