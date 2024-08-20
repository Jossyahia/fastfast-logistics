import { FC } from "react";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

// Define the User type if not already defined
interface User {
  id: string;
  name?: string;
  email: string;
  role: string; // Ensure role is included here
  createdAt: string;
  updatedAt: string;
  bookings: Booking[];
  shipments: Shipment[];
}

interface Booking {
  id: string;
  pickupAddress: string;
  deliveryAddress: string;
  pickupDate: string;
}

interface Shipment {
  id: string;
  trackingNumber: string;
  status: string;
  createdAt: string;
}

interface ViewUserPageProps {
  params: {
    id: string;
  };
}

// Extend or modify this interface based on your session handling
interface SessionUser {
  id: string;
  name?: string;
  email: string;
  role: string; // Ensure role is included here
}

interface Session {
  user: SessionUser;
}

// Define type for the authentication function return type
type AuthReturnType = Session | null;

async function getUser(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      bookings: {
        take: 5,
        orderBy: { createdAt: "desc" },
      },
      shipments: {
        take: 5,
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!user) {
    notFound();
  }

  return user;
}

const ViewUserPage: FC<ViewUserPageProps> = async ({ params }) => {
  const session = (await auth()) as AuthReturnType; // Use AuthReturnType

  // Type guard to ensure session and user are properly defined
  if (!session || !session.user || session.user.role !== "ADMIN") {
    redirect("/api/auth/signin");
  }

  const user = await getUser(params.id);

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg transition-colors duration-200">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600 dark:text-blue-400">
        User Details
      </h1>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="font-semibold">ID:</p>
          <p>{user.id}</p>
        </div>
        <div>
          <p className="font-semibold">Name:</p>
          <p>{user.name || "N/A"}</p>
        </div>
        <div>
          <p className="font-semibold">Email:</p>
          <p>{user.email}</p>
        </div>
        <div>
          <p className="font-semibold">Role:</p>
          <p>{user.role}</p>
        </div>
        <div>
          <p className="font-semibold">Created At:</p>
          <p>{new Date(user.createdAt).toLocaleString()}</p>
        </div>
        <div>
          <p className="font-semibold">Last Updated:</p>
          <p>{new Date(user.updatedAt).toLocaleString()}</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">Recent Bookings</h2>
      {user.bookings.length > 0 ? (
        <ul className="list-disc pl-5">
          {user.bookings.map((booking) => (
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

      <h2 className="text-2xl font-bold mt-8 mb-4">Recent Shipments</h2>
      {user.shipments.length > 0 ? (
        <ul className="list-disc pl-5">
          {user.shipments.map((shipment) => (
            <li key={shipment.id}>
              <Link
                href={`/shipments/${shipment.id}`}
                className="text-blue-500 hover:underline"
              >
                {shipment.trackingNumber} - {shipment.status} (
                {new Date(shipment.createdAt).toLocaleDateString()})
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No recent shipments.</p>
      )}

      <div className="mt-8 flex justify-between">
        <Link
          href="/users"
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
        >
          Back to Users
        </Link>
        <Link
          href={`/users/edit/${user.id}`}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
        >
          Edit User
        </Link>
      </div>
    </div>
  );
};

export default ViewUserPage;
