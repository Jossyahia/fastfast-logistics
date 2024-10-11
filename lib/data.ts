import { neon } from "@neondatabase/serverless";
import { Vendor, MenuItem } from "./../app/types/vendor";

const sql = neon(process.env.DATA_URL!);

export async function getVendor(id: number): Promise<Vendor | null> {
  try {
    const result = await sql`
      SELECT id, name, cuisine, location, rating, likes, reviews 
      FROM vendors 
      WHERE id = ${id}
    `;

    if (!result.length) return null;

    const vendor = result[0] as Partial<Vendor>;

    // Validate and provide defaults for all required fields
    return {
      id: vendor.id ?? id,
      name: vendor.name ?? "Unknown Vendor",
      cuisine: vendor.cuisine ?? "Various",
      location: vendor.location ?? "Unknown Location",
      rating: vendor.rating ?? 0,
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
    const result = await sql`
      SELECT id, name, description, price, image, vendor_id
      FROM menu_items 
      WHERE vendor_id = ${vendorId}
    `;

    console.log("Raw rows:", result);

    return result.map((item: any, index: number) => {
      console.log("Processing item:", item);
      return {
        id: item.id ?? index,
        name: item.name || "Unknown Item",
        description: item.description || "No description available",
        price:
          typeof item.price === "string"
            ? parseFloat(item.price)
            : typeof item.price === "number"
            ? item.price
            : 0,
        image: item.image || "/placeholder-image.jpg",
        vendor_id: item.vendor_id ?? vendorId,
      };
    });
  } catch (error) {
    console.error(`Error fetching menu items for vendor ${vendorId}:`, error);
    return [];
  }
}
