"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// Interfaces
interface UserData {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: "USER" | "RIDER" | "ADMIN";
  createdAt: string;
  updatedAt: string;
  emailVerified?: string;
  bookings: Booking[];
  shipments: Shipment[];
  rider?: RiderData;
}

interface Booking {
  id: string;
  pickupAddress: string;
  deliveryAddress: string;
  status: string;
  packageSize: string;
  price: number;
  isUrgent: boolean;
  paymentMethod: string;
  riderResponse: string;
}

interface Shipment {
  id: string;
  trackingNumber: string;
  status: string;
  currentLocation?: string;
  estimatedDelivery?: string;
}

interface RiderData {
  phoneNumber?: string;
  address?: string;
  maritalStatus?: string;
  guarantorName?: string;
  guarantorPhoneNumber?: string;
  guarantorAddress?: string;
  relationshipWithGuarantor?: string;
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

  const fetchAdminStats = useCallback(async () => {
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
  }, []); // No dependencies needed for this since it doesn't rely on any state or props

  const fetchUserData = useCallback(async () => {
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
  }, [fetchAdminStats]); // Include fetchAdminStats as a dependency

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    } else if (status === "authenticated") {
      fetchUserData();
    }
  }, [status, router, fetchUserData]);

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
        fetchUserData();
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
              <Link
                href="/ViewAllBookings"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsDropdownOpen(false)}
              >
                Your Bookings
              </Link>
              <Link
                href="/profile/edit"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsDropdownOpen(false)}
              >
                Update Profile
              </Link>
              <Link
                href="/"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsDropdownOpen(false)}
              >
                Sign out
              </Link>
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

      {userData && (
        <div className="space-y-6">
          {/* User Details */}
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

          {/* Admin Stats (only visible to admins) */}
          {userData.role === "ADMIN" && adminStats && (
            <section className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
              <h2 className="text-2xl font-semibold mb-4">Admin Stats</h2>
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
            </section>
          )}
        </div>
      )}
    </div>
  );
}
