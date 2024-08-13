import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import CancelBookingButton from "@/components/CancelBookingButton";

async function getBookings(userId: string, page = 1, limit = 10) {
  const skip = (page - 1) * limit;
  const bookings = await prisma.booking.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    skip,
    take: limit,
    include: { rider: true },
  });

  const total = await prisma.booking.count({ where: { userId } });

  return { bookings, total };
}

export default async function ViewAllBookingsPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  const page = parseInt(searchParams.page) || 1;
  const limit = 10;
  const { bookings, total } = await getBookings(session.user.id, page, limit);

  if (bookings.length === 0 && page === 1) {
    return (
      <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
          My Bookings
        </h1>
        <p className="text-center text-gray-600">
          You haven't made any bookings yet.
        </p>
        <div className="mt-4 text-center">
          <Link
            href="/booking"
            className="text-blue-500 hover:text-blue-700 underline"
          >
            Create a New Booking
          </Link>
        </div>
      </div>
    );
  }

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        My Bookings
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Pickup</th>
              <th className="px-4 py-2">Delivery</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-b">
                <td className="px-4 py-2">{booking.id.slice(0, 8)}...</td>
                <td className="px-4 py-2">{booking.pickupAddress}</td>
                <td className="px-4 py-2">{booking.deliveryAddress}</td>
                <td className="px-4 py-2">
                  {new Date(booking.pickupDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">{booking.status}</td>
                <td className="px-4 py-2">
                  <Link
                    href={`/booking/confirmation/${booking.id}`}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    View
                  </Link>
                  {booking.status === "PENDING" && (
                    <CancelBookingButton bookingId={booking.id} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex justify-center">
          <nav className="inline-flex">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <Link
                  key={pageNum}
                  href={`/bookings?page=${pageNum}`}
                  className={`px-3 py-1 mx-1 text-sm font-medium ${
                    pageNum === page
                      ? "bg-blue-500 text-white"
                      : "bg-white text-blue-500 hover:bg-blue-100"
                  } rounded`}
                >
                  {pageNum}
                </Link>
              )
            )}
          </nav>
        </div>
      )}

      <div className="mt-8 text-center">
        <Link
          href="/booking"
          className="text-blue-500 hover:text-blue-700 underline"
        >
          Create a New Booking
        </Link>
      </div>
    </div>
  );
}
