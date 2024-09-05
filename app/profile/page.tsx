"use client"
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface UserData {
  id: string;
  name: string | null;
  email: string;
  emailVerified: string | null;
  image: string | null;
  role: "ADMIN" | "USER" | "RIDER";
  createdAt: string;
  updatedAt: string;
  bookings: Booking[];
  shipments: Shipment[];
  rider: Rider | null;
}

interface Booking {
  id: string;
  pickupAddress: string;
  deliveryAddress: string;
  pickupDate: string;
  deliveryDate: string;
  pickupTime: string;
  deliveryTime: string;
  packageSize: "SMALL" | "MEDIUM" | "LARGE" | "EXTRA_LARGE";
  packageDescription: string | null;
  status:
    | "PROCESSING"
    | "SHIPPED"
    | "IN_TRANSIT"
    | "DELIVERED"
    | "RETURNED"
    | "CANCELLED";
  isUrgent: boolean;
  paymentMethod: "CREDIT_CARD" | "DEBIT_CARD" | "CASH" | "BANK_TRANSFER";
  route: string;
  price: number;
  pickupPhoneNumber: string;
  deliveryPhoneNumber: string;
  notificationSent: boolean;
  riderResponse: "ACCEPTED" | "REJECTED" | "PENDING";
}

interface Shipment {
  id: string;
  trackingNumber: string;
  status:
    | "PROCESSING"
    | "SHIPPED"
    | "IN_TRANSIT"
    | "DELIVERED"
    | "RETURNED"
    | "CANCELLED";
  currentLocation: string | null;
  estimatedDelivery: string | null;
}

interface Rider {
  id: string;
  name: string;
  email: string;
}

export default function UserProfile() {
  const { data: session, status } = useSession();
  const [name, setName] = useState("");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
      router.refresh();
    } else if (status === "authenticated") {
      fetchUserData();
    }
  }, [status, router]);

  const fetchUserData = async () => {
    try {
      const res = await fetch("/api/user");
      if (res.ok) {
        const data: UserData = await res.json();
        setUserData(data);
        setName(data.name || "");
      } else {
        setError("Failed to fetch user data");
      }
    } catch (error) {
      setError("Error fetching user data");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      if (res.ok) {
        fetchUserData();
      } else {
        setError("Failed to update user data");
      }
    } catch (error) {
      setError("Error updating user data");
    }
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6">
        {userData?.name || session?.user?.name}'s Profile
      </h1>

      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Update Name
        </button>
      </form>

      {userData && (
        <div className="space-y-6">
          <section className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
            <h2 className="text-2xl font-semibold mb-4">User Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <p>
                <span className="font-medium">Email:</span> {userData.email}
              </p>
              <p>
                <span className="font-medium">Role:</span> {userData.role}
              </p>
              <p>
                <span className="font-medium">Joined:</span>{" "}
                {new Date(userData.createdAt).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">Last Updated:</span>{" "}
                {new Date(userData.updatedAt).toLocaleDateString()}
              </p>
              {userData.emailVerified && (
                <p>
                  <span className="font-medium">Email Verified:</span>{" "}
                  {new Date(userData.emailVerified).toLocaleDateString()}
                </p>
              )}
            </div>
          </section>

          {userData.role === "USER" && (
            <>
              <section className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
                <h2 className="text-2xl font-semibold mb-4">
                  Bookings ({userData.bookings.length})
                </h2>
                {userData.bookings.length > 0 ? (
                  <ul className="space-y-4">
                    {userData.bookings.map((booking) => (
                      <li key={booking.id} className="border-b pb-2">
                        <p>
                          <span className="font-medium">Pickup:</span>{" "}
                          {booking.pickupAddress}
                        </p>
                        <p>
                          <span className="font-medium">Delivery:</span>{" "}
                          {booking.deliveryAddress}
                        </p>
                        <p>
                          <span className="font-medium">Status:</span>{" "}
                          {booking.status}
                        </p>
                        <p>
                          <span className="font-medium">Package Size:</span>{" "}
                          {booking.packageSize}
                        </p>
                        <p>
                          <span className="font-medium">Price:</span> $
                          {booking.price.toFixed(2)}
                        </p>
                        <p>
                          <span className="font-medium">Urgent:</span>{" "}
                          {booking.isUrgent ? "Yes" : "No"}
                        </p>
                        <p>
                          <span className="font-medium">Payment Method:</span>{" "}
                          {booking.paymentMethod}
                        </p>
                        <p>
                          <span className="font-medium">Rider Response:</span>{" "}
                          {booking.riderResponse}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No bookings found.</p>
                )}
              </section>

              <section className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
                <h2 className="text-2xl font-semibold mb-4">
                  Shipments ({userData.shipments.length})
                </h2>
                {userData.shipments.length > 0 ? (
                  <ul className="space-y-4">
                    {userData.shipments.map((shipment) => (
                      <li key={shipment.id} className="border-b pb-2">
                        <p>
                          <span className="font-medium">Tracking Number:</span>{" "}
                          {shipment.trackingNumber}
                        </p>
                        <p>
                          <span className="font-medium">Status:</span>{" "}
                          {shipment.status}
                        </p>
                        {shipment.currentLocation && (
                          <p>
                            <span className="font-medium">
                              Current Location:
                            </span>{" "}
                            {shipment.currentLocation}
                          </p>
                        )}
                        {shipment.estimatedDelivery && (
                          <p>
                            <span className="font-medium">
                              Estimated Delivery:
                            </span>{" "}
                            {new Date(
                              shipment.estimatedDelivery
                            ).toLocaleDateString()}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No shipments found.</p>
                )}
              </section>
            </>
          )}

          {userData.role === "RIDER" && userData.rider && (
            <section className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
              <h2 className="text-2xl font-semibold mb-4">Rider Details</h2>
              <p>
                <span className="font-medium">Rider ID:</span>{" "}
                {userData.rider.id}
              </p>
              <p>
                <span className="font-medium">Rider Email:</span>{" "}
                {userData.rider.email}
              </p>
              <h3 className="text-xl font-semibold mt-4 mb-2">
                Assigned Bookings
              </h3>
              {userData.bookings.length > 0 ? (
                <ul className="space-y-4">
                  {userData.bookings.map((booking) => (
                    <li key={booking.id} className="border-b pb-2">
                      <p>
                        <span className="font-medium">Booking ID:</span>{" "}
                        {booking.id}
                      </p>
                      <p>
                        <span className="font-medium">Status:</span>{" "}
                        {booking.status}
                      </p>
                      <p>
                        <span className="font-medium">Pickup:</span>{" "}
                        {booking.pickupAddress}
                      </p>
                      <p>
                        <span className="font-medium">Delivery:</span>{" "}
                        {booking.deliveryAddress}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No assigned bookings.</p>
              )}
            </section>
          )}

          {userData.role === "ADMIN" && (
            <section className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
              <h2 className="text-2xl font-semibold mb-4">Admin Dashboard</h2>
              <p>
                <span className="font-medium">Total Users:</span>{" "}
                {/* Add logic to fetch total users */}
              </p>
              <p>
                <span className="font-medium">Total Riders:</span>{" "}
                {/* Add logic to fetch total riders */}
              </p>
              <p>
                <span className="font-medium">Total Bookings:</span>{" "}
                {/* Add logic to fetch total bookings */}
              </p>
              <p>
                <span className="font-medium">Total Shipments:</span>{" "}
                {/* Add logic to fetch total shipments */}
              </p>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
