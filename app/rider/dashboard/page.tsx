// app/rider/dashboard/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma  from "@/lib/prisma";
import BookingList from "@/components/BookingList";
import { configureAbly } from "@/lib/ably";
import { Booking } from "@prisma/client";

export default async function RiderDashboard() {
  const session = await auth();

  if (!session || session.user.role !== "RIDER") {
    console.log(session)
    redirect("/api/auth/signin");
  }

  let availableBookings: Booking[] = [];
  try {
    availableBookings = await prisma.booking.findMany({
      where: {
        riderId: null,
        status: "PROCESSING",
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.error("Error fetching available bookings:", error);
    // Handle the error appropriately, e.g., set an error state
  }

  const ablyKey = process.env.ABLY_API_KEY;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Rider Dashboard</h1>
      <BookingList bookings={availableBookings} />
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
            ${configureAbly(ablyKey)}
            const channel = ably.channels.get('bookings');
            channel.subscribe('new-booking', (message) => {
              // Handle new booking notification
              console.log('New booking:', message.data);
              // You can update the UI here or show a notification
            });
          `,
        }}
      />
    </div>
  );
}
