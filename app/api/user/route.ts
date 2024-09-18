import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

async function getUserSession(request: NextRequest) {
  const session = await auth();
  if (!session || !session.user?.id) {
    return null;
  }
  return session;
}

export async function GET(request: NextRequest) {
  try {
    const session = await getUserSession(request);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        rider: true,
        bookings: true, // Add this line
        shipments: true, // Add this line
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { message: "Error fetching user data" },
      { status: 500 }
    );
  }
}
export async function PUT(request: NextRequest) {
  try {
    const session = await getUserSession(request);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { name, rider } = await request.json();

    // Fetch the existing user data
    const existingUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { rider: true },
    });

    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name,
        rider: rider
          ? {
              upsert: {
                create: {
                  name: name, // Use the user's name for the rider if it's a new rider
                  email: existingUser.email, // Use the user's email for the rider
                  password: "", // You might want to handle this differently
                  phoneNumber: rider.phoneNumber,
                  address: rider.address,
                  guarantorName: rider.guarantorName,
                  guarantorPhoneNumber: rider.guarantorPhoneNumber,
                  guarantorAddress: rider.guarantorAddress,
                  relationshipWithGuarantor: rider.relationshipWithGuarantor,
                  maritalStatus: rider.maritalStatus,
                },
                update: {
                  name: name,
                  phoneNumber: rider.phoneNumber,
                  address: rider.address,
                  guarantorName: rider.guarantorName,
                  guarantorPhoneNumber: rider.guarantorPhoneNumber,
                  guarantorAddress: rider.guarantorAddress,
                  relationshipWithGuarantor: rider.relationshipWithGuarantor,
                  maritalStatus: rider.maritalStatus,
                },
              },
            }
          : undefined,
      },
      include: { rider: true },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user data:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Error updating user data", error: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "An unknown error occurred" },
      { status: 500 }
    );
  }
}