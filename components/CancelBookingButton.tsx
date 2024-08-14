// components/CancelBookingButton.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CancelBookingButton({
  bookingId,
}: {
  bookingId: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCancel = async () => {
    if (!confirm("Are you sure you want to cancel this booking?")) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/bookings/cancel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookingId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to cancel booking");
      }

      alert("Booking canceled successfully");
      router.refresh(); // Refresh the current route
    } catch (error) {
      console.error("Error cancelling booking:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Failed to cancel booking. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleCancel}
      className="text-red-500 hover:text-red-700 disabled:text-gray-400"
      disabled={isLoading}
    >
      {isLoading ? "Cancelling..." : "Cancel"}
    </button>
  );
}
