import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";

async function getBookingAndShipment(id: string) {
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: { rider: true },
  });

  if (!booking) {
    return null;
  }

  const shipment = await prisma.shipment.findFirst({
    where: { userId: booking.userId, createdAt: { gte: booking.createdAt } },
  });

  return { booking, shipment };
}

export default async function BookingConfirmationPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getBookingAndShipment(params.id);

  if (!data) {
    notFound();
  }

  const { booking, shipment } = data;

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Booking Confirmation
      </h1>

      <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6">
        Your booking has been successfully created!
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Booking Details
          </h2>
          <ul className="space-y-2">
            <li>
              <strong>Booking ID:</strong> {booking.id}
            </li>
            <li>
              <strong>Pickup Address:</strong> {booking.pickupAddress}
            </li>
            <li>
              <strong>Delivery Address:</strong> {booking.deliveryAddress}
            </li>
            <li>
              <strong>Pickup Date:</strong>{" "}
              {booking.pickupDate.toLocaleDateString()}
            </li>
            <li>
              <strong>Delivery Date:</strong>{" "}
              {booking.deliveryDate.toLocaleDateString()}
            </li>
            <li>
              <strong>Pickup Time:</strong> {booking.pickupTime}
            </li>
            <li>
              <strong>Delivery Time:</strong> {booking.deliveryTime}
            </li>
            <li>
              <strong>Package Size:</strong> {booking.packageSize}
            </li>
            <li>
              <strong>Package Description:</strong>{" "}
              {booking.packageDescription || "N/A"}
            </li>
            <li>
              <strong>Urgent:</strong> {booking.isUrgent ? "Yes" : "No"}
            </li>
            <li>
              <strong>Payment Method:</strong> {booking.paymentMethod}
            </li>
            <li>
              <strong>Price:</strong> #{booking.price.toFixed(2)}
            </li>
            <li>
              <strong>Status:</strong> {booking.status}
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Shipment Details
          </h2>
          {shipment ? (
            <ul className="space-y-2">
              <li>
                <strong>Tracking Number:</strong> {shipment.trackingNumber}
              </li>
              <li>
                <strong>Status:</strong> {shipment.status}
              </li>
              <li>
                <strong>Current Location:</strong>{" "}
                {shipment.currentLocation || "N/A"}
              </li>
              <li>
                <strong>Estimated Delivery:</strong>{" "}
                {shipment.estimatedDelivery
                  ? shipment.estimatedDelivery.toLocaleDateString()
                  : "N/A"}
              </li>
            </ul>
          ) : (
            <p>Shipment details not available yet.</p>
          )}
        </div>
      </div>

      {booking.rider && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Rider Information
          </h2>
          <ul className="space-y-2">
            <li>
              <strong>Name:</strong> {booking.rider.name}
            </li>
            <li>
              <strong>Email:</strong> {booking.rider.email}
            </li>
          </ul>
        </div>
      )}

      <div className="mt-8 text-center">
        <a
          href="/ViewAllBookings"
          className="text-blue-500 hover:text-blue-700 underline"
        >
          View All Bookings
        </a>
      </div>
    </div>
  );
}
