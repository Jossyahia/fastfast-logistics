import { NextResponse } from "next/server";
import { Client } from "pg";

export async function POST(request: Request) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false, // Use this only for development. For production, set up proper SSL certificates.
    },
  });

  try {
    await client.connect();

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
    } = body;

    // Create the bookings table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        pickup_address TEXT NOT NULL,
        delivery_address TEXT NOT NULL,
        pickup_date DATE NOT NULL,
        delivery_date DATE NOT NULL,
        pickup_time TEXT NOT NULL,
        delivery_time TEXT NOT NULL,
        package_size TEXT NOT NULL,
        package_description TEXT,
        is_urgent BOOLEAN NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Insert the booking data
    const result = await client.query(
      `
      INSERT INTO bookings (
        pickup_address, delivery_address, pickup_date, delivery_date,
        pickup_time, delivery_time, package_size, package_description, is_urgent
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id
    `,
      [
        pickupAddress,
        deliveryAddress,
        pickupDate,
        deliveryDate,
        pickupTime,
        deliveryTime,
        packageSize,
        packageDescription,
        isUrgent,
      ]
    );

    return NextResponse.json(
      { message: "Booking created successfully", bookingId: result.rows[0].id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { message: "Error creating booking" },
      { status: 500 }
    );
  } finally {
    await client.end();
  }
}
