"use client";

import React, { useState } from "react";
import { Booking } from "@prisma/client";
import { useRouter } from "next/navigation";

interface BookingListProps {
  bookings: Booking[];
}

const BookingList: React.FC<BookingListProps> = ({ bookings }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleBookingAction = async (
    bookingId: string,
    action: "accept" | "reject"
  ) => {
    setLoading(bookingId);
    setErrorMessage(null);

    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update booking");
      }

      router.refresh();
    } catch (error) {
      console.error("Error updating booking:", error);
      setErrorMessage(error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {bookings.map((booking) => (
        <div
          key={booking.id}
          className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-md transition-colors duration-200 rounded-lg p-4"
        >
          <h3 className="text-lg font-semibold mb-2">Booking #{booking.id}</h3>
          <p>Pickup: {booking.pickupAddress}</p>
          <p>Delivery: {booking.deliveryAddress}</p>
          <p>
            Pickup Date: {new Date(booking.pickupDate).toLocaleDateString()}
          </p>
          <p>
            Delivery Date: {new Date(booking.deliveryDate).toLocaleDateString()}
          </p>
          <p>Package Size: {booking.packageSize}</p>
          <div className="mt-4 flex justify-between">
            <button
              onClick={() => handleBookingAction(booking.id, "accept")}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors disabled:opacity-50"
              disabled={loading === booking.id}
            >
              {loading === booking.id ? "Processing..." : "Accept"}
            </button>
            <button
              onClick={() => handleBookingAction(booking.id, "reject")}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors disabled:opacity-50"
              disabled={loading === booking.id}
            >
              {loading === booking.id ? "Processing..." : "Reject"}
            </button>
          </div>
          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        </div>
      ))}
    </div>
  );
};

export default BookingList;
