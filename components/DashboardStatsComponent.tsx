"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Mock data - replace with actual API calls in a real application
const fetchDashboardData = async () => {
  // Simulating API call
  return {
    totalBookings: 1250,
    totalUsers: 850,
    bookingStatus: {
      PROCESSING: 100,
      SHIPPED: 300,
      IN_TRANSIT: 400,
      DELIVERED: 350,
      RETURNED: 50,
      CANCELLED: 50,
    },
  };
};

interface StatCardProps {
  title: string;
  value: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value }) => (
  <Card className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 m-2 p-4">
    <h3 className="text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold">{value}</p>
  </Card>
);

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState<null | {
    totalBookings: number;
    totalUsers: number;
    bookingStatus: Record<string, number>;
  }>(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      const data = await fetchDashboardData();
      setDashboardData(data);
    };
    loadDashboardData();
  }, []);

  if (!dashboardData) {
    return <div>Loading...</div>;
  }

  const chartData = Object.entries(dashboardData.bookingStatus).map(
    ([status, count]) => ({
      status,
      count,
    })
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <div className="flex flex-wrap -m-2">
        <StatCard title="Total Bookings" value={dashboardData.totalBookings} />
        <StatCard title="Total Users" value={dashboardData.totalUsers} />
      </div>

      <Card className="mt-4 p-4">
        <h2 className="text-xl font-semibold mb-2">Booking Status Overview</h2>
        <div className="h-[300px] sm:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries(dashboardData.bookingStatus).map(([status, count]) => (
          <StatCard key={status} title={`${status} Bookings`} value={count} />
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
