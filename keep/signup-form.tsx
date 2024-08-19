import { FC } from "react";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

interface ViewRiderPageProps {
  params: {
    id: string;
  };
}

async function getRider(id: string) {
  const rider = await prisma.rider.findUnique({
    where: { id },
    include: {
      bookings: {
        take: 5,
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!rider) {
    notFound();
  }

  return rider;
}

const ViewRiderPage: FC<ViewRiderPageProps> = async ({ params }) => {
  const session = await auth();
  if (!session || !session.user || session.user.role !== "ADMIN") {
    redirect("/api/auth/signin");
  }

  const rider = await getRider(params.id);

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg transition-colors duration-200">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600 dark:text-blue-400">
        Rider Details
      </h1>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="font-semibold">ID:</p>
          <p>{rider.id}</p>
        </div>
        <div>
          <p className="font-semibold">Name:</p>
          <p>{rider.name}</p>
        </div>
        <div>
          <p className="font-semibold">Email:</p>
          <p>{rider.email}</p>
        </div>
        <div>
          <p className="font-semibold">Created At:</p>
          <p>{new Date(rider.createdAt).toLocaleString()}</p>
        </div>
        <div>
          <p className="font-semibold">Last Updated:</p>
          <p>{new Date(rider.updatedAt).toLocaleString()}</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">Recent Bookings</h2>
      {rider.bookings.length > 0 ? (
        <ul className="list-disc pl-5">
          {rider.bookings.map((booking) => (
            <li key={booking.id}>
              <Link
                href={`/booking/confirmation/${booking.id}`}
                className="text-blue-500 hover:underline"
              >
                {booking.pickupAddress} to {booking.deliveryAddress} (
                {new Date(booking.pickupDate).toLocaleDateString()})
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No recent bookings.</p>
      )}

      <div className="mt-8 flex justify-between">
        <Link
          href="/riders"
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
        >
          Back to Riders
        </Link>
        <Link
          href={`/riders/edit/${rider.id}`}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
        >
          Edit Rider
        </Link>
      </div>
    </div>
  );
};

export default ViewRiderPage;
