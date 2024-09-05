// components/RiderDashboard.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { Booking } from "@prisma/client";

const RiderDashboard = async () => {
  const session = await auth();

  if (!session || session.user.role !== "RIDER") {
    redirect("/restricted");
  }

  const riderId = session.user.id;

  console.log("Rider ID:", riderId);

  const bookings = await prisma.booking.findMany({
    where: {
      riderId,
    },
    include: {
      user: true,
      shipment: true,
    },
  });

  console.log("Bookings:", bookings);

  return (
    <div>
      <h1>Rider Dashboard</h1>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            <h2>Booking {booking.id}</h2>
            <p>
              User: {booking.user.name} ({booking.user.email})
            </p>
            <p>Pickup Address: {booking.pickupAddress}</p>
            <p>Delivery Address: {booking.deliveryAddress}</p>
            <p>Status: {booking.status}</p>
            {booking.shipment && (
              <p>Shipment: {booking.shipment.trackingNumber}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RiderDashboard;
