import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

function generateTrackingNumber() {
  return "Fls-Sap" + Math.random().toString(36).substr(2, 9).toUpperCase();
}

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "You are not authorized please login " }, { status: 401 });
    }

    const userId = session.user.id; // Store the user ID in a separate variable

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

    // Define package size fees
    const sizeFees: { [key: string]: number } = {
      SMALL: 200,
      MEDIUM: 500,
      LARGE: 1000,
      EXTRA_LARGE: 1500,
    };

    // Calculate size fee based on package size
    const sizeFee = sizeFees[packageSize] || 0;
    const price = basePrice + urgentFee + sizeFee;

    // Create booking and shipment in a transaction
    const result = await prisma.$transaction(async (prisma) => {
      const booking = await prisma.booking.create({
        data: {
          userId: userId, // Using the stored user ID
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
          status: "PROCESSING",
          shipment: {
            create: {
              trackingNumber: generateTrackingNumber(),
              status: "PROCESSING",
              currentLocation: pickupAddress,
              estimatedDelivery: new Date(deliveryDate),
              userId: userId, // Using the stored user ID
            },
          },
        },
        include: {
          shipment: true,
        },
      });

      console.log("Created booking:", booking);
      return booking;
    });

    return NextResponse.json({ success: true, booking: result });
  } catch (error) {
    console.error("Error creating booking:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return NextResponse.json(
      { error: "Failed to create booking", details: errorMessage },
      { status: 500 }
    );
  }
}
