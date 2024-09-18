"use client";
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
  rider: Rider | null;
  bookings: Booking[];
  shipments: Shipment[];
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

export default function UserProfile() {
  const { data: session, status } = useSession();
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
      } else {
        setError("Failed to fetch user data");
      }
    } catch (error) {
      setError("Error fetching user data");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserData((prevData) => {
      if (!prevData) return null;

      // Handle rider fields
      if (name.startsWith("rider.")) {
        const riderField = name.split(".")[1];
        return {
          ...prevData,
          rider: {
            ...prevData.rider!,
            [riderField]: value,
          },
        };
      }

      // Handle general user fields
      return { ...prevData, [name]: value };
    });
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

      {userData && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <section className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
            <h2 className="text-2xl font-semibold mb-4">User Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-1"
                >
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={userData.name || ""}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  value={userData.email}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                />
              </div>
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium mb-1"
                >
                  Role:
                </label>
                <input
                  type="text"
                  id="role"
                  value={userData.role}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                />
              </div>
              <div>
                <label
                  htmlFor="joinedDate"
                  className="block text-sm font-medium mb-1"
                >
                  Joined Date:
                </label>
                <input
                  type="text"
                  id="joinedDate"
                  value={new Date(userData.createdAt).toLocaleDateString()}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                />
              </div>
            </div>
          </section>

          {userData.role === "RIDER" && userData.rider && (
            <section className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
              <h2 className="text-2xl font-semibold mb-4">Rider Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="rider.phoneNumber"
                    className="block text-sm font-medium mb-1"
                  >
                    Phone Number:
                  </label>
                  <input
                    type="tel"
                    id="rider.phoneNumber"
                    name="rider.phoneNumber"
                    value={userData.rider?.phoneNumber || ""}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="rider.address"
                    className="block text-sm font-medium mb-1"
                  >
                    Address:
                  </label>
                  <input
                    type="text"
                    id="rider.address"
                    name="rider.address"
                    value={userData.rider?.address || ""}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="rider.maritalStatus"
                    className="block text-sm font-medium mb-1"
                  >
                    Marital Status:
                  </label>
                  <select
                    id="rider.maritalStatus"
                    name="rider.maritalStatus"
                    value={userData.rider?.maritalStatus || ""}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select</option>
                    <option value="SINGLE">Single</option>
                    <option value="MARRIED">Married</option>
                    <option value="DIVORCED">Divorced</option>
                    <option value="WIDOWED">Widowed</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="rider.guarantorName"
                    className="block text-sm font-medium mb-1"
                  >
                    Guarantor Name:
                  </label>
                  <input
                    type="text"
                    id="rider.guarantorName"
                    name="rider.guarantorName"
                    value={userData.rider?.guarantorName || ""}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="rider.guarantorPhoneNumber"
                    className="block text-sm font-medium mb-1"
                  >
                    Guarantor Phone Number:
                  </label>
                  <input
                    type="tel"
                    id="rider.guarantorPhoneNumber"
                    name="rider.guarantorPhoneNumber"
                    value={userData.rider?.guarantorPhoneNumber || ""}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="rider.guarantorAddress"
                    className="block text-sm font-medium mb-1"
                  >
                    Guarantor Address:
                  </label>
                  <input
                    type="text"
                    id="rider.guarantorAddress"
                    name="rider.guarantorAddress"
                    value={userData.rider?.guarantorAddress || ""}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="rider.relationshipWithGuarantor"
                    className="block text-sm font-medium mb-1"
                  >
                    Relationship with Guarantor:
                  </label>
                  <input
                    type="text"
                    id="rider.relationshipWithGuarantor"
                    name="rider.relationshipWithGuarantor"
                    value={userData.rider?.relationshipWithGuarantor || ""}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </section>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Save Changes
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
