// app/bookings/page.tsx
import Link from "next/link";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import CancelBookingButton from "@/components/CancelBookingButton";
import FilterForm from "@/components/FilterForm";
import { auth } from "@/auth";
async function getBookings(userId: string, searchParams: any) {
  const page = parseInt(searchParams.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  let where: any = { userId };

  // Apply filters
  if (searchParams.status) {
    where.status = searchParams.status;
  }
  if (searchParams.startDate && searchParams.endDate) {
    where.pickupDate = {
      gte: new Date(searchParams.startDate),
      lte: new Date(searchParams.endDate),
    };
  }

  // Apply search
  if (searchParams.search) {
    where.OR = [
      { pickupAddress: { contains: searchParams.search, mode: "insensitive" } },
      {
        deliveryAddress: { contains: searchParams.search, mode: "insensitive" },
      },
    ];
  }

  const orderBy = searchParams.sortBy
    ? { [searchParams.sortBy]: searchParams.sortOrder || "asc" }
    : { createdAt: "desc" };

  const bookings = await prisma.booking.findMany({
    where,
    orderBy,
    skip,
    take: limit,
    include: { rider: true },
  });

  const total = await prisma.booking.count({ where });

  return { bookings, total };
}

export default async function ViewAllBookingsPage({
  searchParams,
}: {
  searchParams: {
    page?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    search?: string;
  };
}) {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  const { bookings, total } = await getBookings(session.user.id, searchParams);

  const page = parseInt(searchParams.page || "1");
  const limit = 10;
  const totalPages = Math.ceil(total / limit);

  if (
    bookings.length === 0 &&
    page === 1 &&
    !searchParams.search &&
    !searchParams.status &&
    !searchParams.startDate &&
    !searchParams.endDate
  ) {
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

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        My Bookings
      </h1>

      <FilterForm searchParams={searchParams} />

      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">
                <Link
                  href={`/bookings?sortBy=pickupAddress&sortOrder=${
                    searchParams.sortOrder === "asc" ? "desc" : "asc"
                  }`}
                >
                  Pickup
                </Link>
              </th>
              <th className="px-4 py-2">
                <Link
                  href={`/bookings?sortBy=deliveryAddress&sortOrder=${
                    searchParams.sortOrder === "asc" ? "desc" : "asc"
                  }`}
                >
                  Delivery
                </Link>
              </th>
              <th className="px-4 py-2">
                <Link
                  href={`/bookings?sortBy=pickupDate&sortOrder=${
                    searchParams.sortOrder === "asc" ? "desc" : "asc"
                  }`}
                >
                  Date
                </Link>
              </th>
              <th className="px-4 py-2">
                <Link
                  href={`/bookings?sortBy=status&sortOrder=${
                    searchParams.sortOrder === "asc" ? "desc" : "asc"
                  }`}
                >
                  Status
                </Link>
              </th>
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
                  {booking.status === "PROCESSING" && (
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
                  href={`/bookings?page=${pageNum}&status=${
                    searchParams.status || ""
                  }&startDate=${searchParams.startDate || ""}&endDate=${
                    searchParams.endDate || ""
                  }&sortBy=${searchParams.sortBy || ""}&sortOrder=${
                    searchParams.sortOrder || ""
                  }&search=${searchParams.search || ""}`}
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
