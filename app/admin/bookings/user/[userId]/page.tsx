import React from "react";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { Calendar, MapPin, Phone, Truck, User, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";


interface UserBookingsPageProps {
  params: {
    userId: string;
  };
}

export default async function UserBookingsPage({
  params,
}: UserBookingsPageProps) {
  const session = await auth();
   if (!session || session.user.role !== "ADMIN") {
     redirect("/restricted");
   }
  const userId = params.userId;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      bookings: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/admin/bookings"
        className="flex items-center text-blue-500 hover:underline mb-4"
      >
        <ArrowLeft className="mr-2" />
        Back to All Bookings
      </Link>

      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <User className="mr-2" />
        Bookings for {user.name}
      </h2>

      {user.bookings.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">
          No bookings found for this user.
        </p>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          {/* Desktop view */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Pickup
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Delivery
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Dates
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {user.bookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 ease-in-out"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {booking.pickupAddress}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-300">
                        {booking.pickupPhoneNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {booking.deliveryAddress}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-300">
                        {booking.deliveryPhoneNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      <div>
                        Pickup: {booking.pickupDate.toLocaleDateString()}
                      </div>
                      <div>
                        Delivery: {booking.deliveryDate.toLocaleDateString()}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile view */}
          <div className="md:hidden">
            {user.bookings.map((booking) => (
              <div
                key={booking.id}
                className="border-b border-gray-200 dark:border-gray-700 px-4 py-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                    {booking.status}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-900 dark:text-white">
                        Pickup: {booking.pickupAddress}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-300">
                        {booking.pickupPhoneNumber}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Truck className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-900 dark:text-white">
                        Delivery: {booking.deliveryAddress}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-300">
                        {booking.deliveryPhoneNumber}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                    <div className="text-sm text-gray-500 dark:text-gray-300">
                      <div>
                        Pickup: {booking.pickupDate.toLocaleDateString()}
                      </div>
                      <div>
                        Delivery: {booking.deliveryDate.toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
