import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const vendors = await prisma.vendor.findMany();
    return NextResponse.json(vendors);
  } catch (error) {
    console.error("Error fetching vendors:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching vendors" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { vendor, menuItems } = await request.json();

    const result = await prisma.$transaction(async (prisma) => {
      // Insert vendor
      const createdVendor = await prisma.vendor.create({
        data: {
          name: vendor.name,
          cuisine: vendor.cuisine,
          location: vendor.location,
          rating: parseFloat(vendor.rating), // Convert to float if it's a string
          likes: parseInt(vendor.likes), // Convert to integer
          reviews: parseInt(vendor.reviews), // Convert to integer if needed
        },
      });

      // Insert menu items
      await prisma.menuItem.createMany({
        data: menuItems.map((item: any) => ({
          vendorId: createdVendor.id,
          name: item.name,
          description: item.description,
          price: parseFloat(item.price), // Convert to float if it's a string
          image: item.image,
        })),
      });

      return createdVendor;
    });

    return NextResponse.json(
      { message: "Vendor and menu items created successfully", vendor: result },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating vendor:", error);
    return NextResponse.json(
      { error: "An error occurred while creating the vendor" },
      { status: 500 }
    );
  }
}
