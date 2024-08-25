// app/admin/bookings/page.tsx
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export default async function BookingsPage() {
  const session = await auth();
  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
    include: { user: true },
   
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Bookings</h2>
      <table className="min-w-full bg-neutral-100 dark:bg-neutral-900 transition-colors duration-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">User</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Pickup Location</th>
            <th className="py-2 px-4 border-b">Delivery Location</th>
            <th className="py-2 px-4 border-b">Pickup Date</th>
            <th className="py-2 px-4 border-b">Delivery Date</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td className="py-2 px-4 border-b">{booking.user.name}</td>
              <td className="py-2 px-4 border-b">{booking.status}</td>
              <td className="py-2 px-4 border-b">{booking.pickupAddress}</td>
              <td className="py-2 px-4 border-b">{booking.deliveryAddress}</td>
              <td className="py-2 px-4 border-b">
                {booking.pickupDate.toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border-b">
                {booking.deliveryDate.toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
