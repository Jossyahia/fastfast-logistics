// components/CancelBookingButton.tsx
"use client";

export default function CancelBookingButton({
  bookingId,
}: {
  bookingId: string;
}) {
  const handleCancel = async () => {
    // Implement the cancel booking logic here
    console.log("Cancel booking with ID:", bookingId);
  };

  return (
    <button onClick={handleCancel} className="text-red-500 hover:text-red-700">
      Cancel
    </button>
  );
}
