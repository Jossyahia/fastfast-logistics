import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";
import { auth } from "@/auth";

const pool = new Pool({
  connectionString: process.env.DATA_URL,
});

export async function GET() {
  try {
    const client = await pool.connect();
    try {
      const result = await client.query("SELECT * FROM vendors");
      return NextResponse.json(result.rows);
    } finally {
      client.release();
    }
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

    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      // Insert vendor
      const vendorResult = await client.query(
        "INSERT INTO vendors (name, cuisine, location, rating, likes, reviews) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
        [
          vendor.name,
          vendor.cuisine,
          vendor.location,
          vendor.rating,
          vendor.likes,
          vendor.reviews,
        ]
      );
      const vendorId = vendorResult.rows[0].id;

      // Insert menu items
      for (const item of menuItems) {
        await client.query(
          "INSERT INTO menu_items (vendor_id, name, description, price, image) VALUES ($1, $2, $3, $4, $5)",
          [vendorId, item.name, item.description, item.price, item.image]
        );
      }

      await client.query("COMMIT");
      return NextResponse.json(
        { message: "Vendor and menu items created successfully" },
        { status: 201 }
      );
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Error creating vendor:", error);
    return NextResponse.json(
      { error: "An error occurred while creating the vendor" },
      { status: 500 }
    );
  }
}
