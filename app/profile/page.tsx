"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// ... (keep all the existing interfaces)
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
  phoneNumber: string | null;
  address: string | null;
  guarantorName: string | null;
  guarantorPhoneNumber: string | null;
  guarantorAddress: string | null;
  relationshipWithGuarantor: string | null;
  maritalStatus: "SINGLE" | "MARRIED" | "DIVORCED" | "WIDOWED" | null;
}

interface AdminStats {
  totalUsers: number;
  totalRiders: number;
  totalBookings: number;
  totalShipments: number;
}

export default function UserProfile() {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [adminStats, setAdminStats] = useState<AdminStats | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    } else if (status === "authenticated") {
      fetchUserData();
    }
  }, [status, router]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ... (keep all the existing functions: fetchUserData, fetchAdminStats, handleInputChange, handleSubmit)
    const fetchUserData = async () => {
      try {
        const res = await fetch("/api/user");
        if (res.ok) {
          const data: UserData = await res.json();
          setUserData(data);
          if (data.role === "ADMIN") {
            fetchAdminStats();
          }
        } else {
          const errorData = await res.json();
          setError(errorData.message || "Failed to fetch user data");
        }
      } catch (error) {
        setError("Error fetching user data");
      }
    };

    const fetchAdminStats = async () => {
      try {
        const res = await fetch("/api/admin/stats");
        if (res.ok) {
          const stats: AdminStats = await res.json();
          setAdminStats(stats);
        } else {
          const errorData = await res.json();
          setError(errorData.message || "Failed to fetch admin stats");
        }
      } catch (error) {
        setError("Error fetching admin stats");
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
        body: JSON.stringify({
          name: userData?.name,
          rider: userData?.rider
            ? {
                phoneNumber: userData.rider.phoneNumber,
                address: userData.rider.address,
                maritalStatus: userData.rider.maritalStatus,
                guarantorName: userData.rider.guarantorName,
                guarantorPhoneNumber: userData.rider.guarantorPhoneNumber,
                guarantorAddress: userData.rider.guarantorAddress,
                relationshipWithGuarantor:
                  userData.rider.relationshipWithGuarantor,
              }
            : null,
        }),
      });
      if (res.ok) {
        setError(null);
        alert("Profile updated successfully");
        fetchUserData(); // Refresh the data after update
      } else {
        const errorData = await res.json();
        setError(errorData.message || "Failed to update user data");
      }
    } catch (error) {
      setError("Error updating user data");
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          {userData?.name || session?.user?.name}'s Profile
        </h1>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="flex items-center space-x-2 focus:outline-none"
          >
            {userData?.image || session?.user?.image ? (
              <Image
                src={
                  userData?.image ||
                  session?.user?.image ||
                  "/default-avatar.png"
                }
                alt="User Avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
            ) : (
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-600 font-semibold">
                  {(userData?.name ||
                    session?.user?.name ||
                    "U")[0].toUpperCase()}
                </span>
              </div>
            )}
            <span className="hidden md:inline">
              {userData?.name || session?.user?.name}
            </span>
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10">
              <a
                href="#profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsDropdownOpen(false)}
              >
                Profile
              </a>
              <a
                href="#settings"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsDropdownOpen(false)}
              >
                Settings
              </a>
              <a
                href="/api/auth/signout"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsDropdownOpen(false)}
              >
                Sign out
              </a>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      {/* ... (keep the rest of the component's JSX structure) */}
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
              <div className="grid grid-cols-2 gap-4">
                <p>
                  <span className="font-medium">Phone Number:</span>{" "}
                  {userData.rider.phoneNumber || "Not provided"}
                </p>
                <p>
                  <span className="font-medium">Address:</span>{" "}
                  {userData.rider.address || "Not provided"}
                </p>
                <p>
                  <span className="font-medium">Marital Status:</span>{" "}
                  {userData.rider.maritalStatus || "Not provided"}
                </p>
                <p>
                  <span className="font-medium">Guarantor Name:</span>{" "}
                  {userData.rider.guarantorName || "Not provided"}
                </p>
                <p>
                  <span className="font-medium">Guarantor Phone:</span>{" "}
                  {userData.rider.guarantorPhoneNumber || "Not provided"}
                </p>
                <p>
                  <span className="font-medium">Guarantor Address:</span>{" "}
                  {userData.rider.guarantorAddress || "Not provided"}
                </p>
                <p>
                  <span className="font-medium">
                    Relationship with Guarantor:
                  </span>{" "}
                  {userData.rider.relationshipWithGuarantor || "Not provided"}
                </p>
              </div>
            </section>
          )}

          {userData && userData.role === "ADMIN" && (
            <section className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
              <h2 className="text-2xl font-semibold mb-4">Admin Dashboard</h2>
              {adminStats ? (
                <div className="grid grid-cols-2 gap-4">
                  <p>
                    <span className="font-medium">Total Users:</span>{" "}
                    {adminStats.totalUsers}
                  </p>
                  <p>
                    <span className="font-medium">Total Riders:</span>{" "}
                    {adminStats.totalRiders}
                  </p>
                  <p>
                    <span className="font-medium">Total Bookings:</span>{" "}
                    {adminStats.totalBookings}
                  </p>
                  <p>
                    <span className="font-medium">Total Shipments:</span>{" "}
                    {adminStats.totalShipments}
                  </p>
                </div>
              ) : (
                <p>Loading admin stats...</p>
              )}
            </section>
          )}
        </div>
      )}
    </div>
  );
}
