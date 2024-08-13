import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
function generateTrackingNumber() {
  return (
    "fls-track" + Math.random().toString(36).substr(2, 9).toUpperCase()
  );
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
      paymentMethod,
      pickupPhoneNumber,
      deliveryPhoneNumber,
    } = body;

    // Simple route calculation (replace with actual logic)
    const route = `${pickupAddress} to ${deliveryAddress}`;

    // Simple price calculation (replace with actual logic)
    const basePrice = 800;
    const urgentFee = isUrgent ? 500 : 0;
    const sizeFee =
      { SMALL: 200, MEDIUM: 500, LARGE: 1000, EXTRA_LARGE: 1500 }[
        packageSize
      ] || 0;
    const price = basePrice + urgentFee + sizeFee;

    // Create booking and shipment in a transaction
    const result = await prisma.$transaction(async (prisma) => {
      const booking = await prisma.booking.create({
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
          paymentMethod,
          route,
          price,
          pickupPhoneNumber,
          deliveryPhoneNumber,
          status: "PENDING",
        },
      });

      const shipment = await prisma.shipment.create({
        data: {
          trackingNumber: generateTrackingNumber(),
          status: "PROCESSING",
          currentLocation: pickupAddress,
          estimatedDelivery: new Date(deliveryDate),
          userId: session.user.id,
        },
      });

      return { booking, shipment };
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const bookings = await prisma.booking.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      include: { rider: true },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
