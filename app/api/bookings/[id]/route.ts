// app/api/bookings/[id]/route.ts
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();

  // Check if the user is authenticated
  if (!session || !session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Fetch the user to verify the role
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        role: true,
      },
    });

    // Check if the user has the 'RIDER' role
    if (!user || user.role !== "RIDER") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { action } = await request.json();

    // Validate the action
    if (action !== "accept" && action !== "reject") {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    // Check if the rider exists for the authenticated user
    const rider = await prisma.rider.findUnique({
      where: { userId: session.user.id },
    });

    if (!rider) {
      console.error("Rider not found for user ID:", session.user.id);
      return NextResponse.json({ error: "Rider not found" }, { status: 404 });
    }

    // Check if the booking exists
    const booking = await prisma.booking.findUnique({
      where: { id: params.id },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Update the booking with the rider's response
    const updatedBooking = await prisma.booking.update({
      where: { id: params.id },
      data: {
        riderId: action === "accept" ? rider.id : null,
        riderResponse: action === "accept" ? "ACCEPTED" : "REJECTED",
      },
    });

    return NextResponse.json(updatedBooking);
  } catch (error: any) {
    console.error("Error updating booking:", error);

    // Handle specific Prisma errors
    if (error.code === "P2025") {
      // Prisma error code for record not found
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "An error occurred while updating the booking" },
      { status: 500 }
    );
  }
}
