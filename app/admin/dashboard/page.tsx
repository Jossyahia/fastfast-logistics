// app/admin/dashboard/page.tsx
import React from "react";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { Status } from "@prisma/client";
import { notFound } from "next/navigation";

interface DashboardStats {
  totalUsers: number;
  totalBookings: number;
  bookingsByStatus: { status: Status; count: number }[];
}

export const revalidate = 60; // Revalidate every 60 seconds

const DashboardPage = async () => {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    return notFound(); // Restrict access to admin users only
  }

  try {
    // Optimize database queries using Promise.all to fetch data concurrently
    const [totalUsers, totalBookings, bookingsByStatus] = await Promise.all([
      prisma.user.count(),
      prisma.booking.count(),
      prisma.booking.groupBy({
        by: ["status"],
        _count: {
          status: true,
        },
      }),
    ]);

    const stats: DashboardStats = {
      totalUsers,
      totalBookings,
      bookingsByStatus: bookingsByStatus.map((b) => ({
        status: b.status,
        count: b._count.status,
      })),
    };

    return (
      <div className="p-4 md:p-8">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Users" value={stats.totalUsers} />
          <StatCard title="Total Bookings" value={stats.totalBookings} />
          {stats.bookingsByStatus.map((stat) => (
            <StatCard
              key={stat.status}
              title={`Bookings ${formatStatus(stat.status)}`}
              value={stat.count}
            />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Failed to load dashboard data:", error);
    return (
      <div className="p-4 md:p-8">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <p className="text-red-600">
          Failed to load dashboard data. Please try again later.
        </p>
      </div>
    );
  }
};

interface StatCardProps {
  title: string;
  value: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-700">{title}</h2>
      <p className="mt-4 text-3xl font-semibold text-gray-900">{value}</p>
    </div>
  );
};

const formatStatus = (status: Status): string => {
  switch (status) {
    case Status.PROCESSING:
      return "Processing";
    case Status.SHIPPED:
      return "Shipped";
    case Status.IN_TRANSIT:
      return "In Transit";
    case Status.DELIVERED:
      return "Delivered";
    case Status.RETURNED:
      return "Returned";
    case Status.CANCELLED:
      return "Cancelled";
    default:
      return status;
  }
};

export default DashboardPage;
