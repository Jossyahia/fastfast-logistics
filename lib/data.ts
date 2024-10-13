import { PrismaClient } from "@prisma/client";
import { Vendor, MenuItem } from "./../app/types/vendor";

const prisma = new PrismaClient();

export async function getVendor(id: number): Promise<Vendor | null> {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: { id: id },
    });

    if (!vendor) return null;

    return {
      id: vendor.id,
      name: vendor.name ?? "Unknown Vendor",
      cuisine: vendor.cuisine ?? "Various",
      location: vendor.location ?? "Unknown Location",
      rating: vendor.rating ? vendor.rating.toNumber() : 0,
      likes: vendor.likes ?? 0,
      reviews: vendor.reviews ?? 0,
    };
  } catch (error) {
    console.error(`Error fetching vendor ${id}:`, error);
    throw error;
  }
}

export async function getMenuItems(vendorId: number): Promise<MenuItem[]> {
  try {
    const menuItems = await prisma.menuItem.findMany({
      where: { vendorId: vendorId },
    });

    console.log("Raw rows:", menuItems);

    return menuItems.map((item, index) => {
      console.log("Processing item:", item);
      return {
        id: item.id ?? index,
        name: item.name || "Unknown Item",
        description: item.description || "No description available",
        price: typeof item.price === "number" ? item.price : 0,
        image: item.image || "/placeholder-image.jpg",
        vendor_id: item.vendorId,
      };
    });
  } catch (error) {
    console.error(`Error fetching menu items for vendor ${vendorId}:`, error);
    return [];
  }
}
