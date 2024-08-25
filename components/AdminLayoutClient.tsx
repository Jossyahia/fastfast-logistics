"use client";

import React, { useState } from "react";
import Link from "next/link";

const AdminLayoutClient = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-neutral-100 dark:bg-neutral-900 transition-colors duration-200">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-16"
        } bg-white dark:bg-neutral-800 shadow-md flex flex-col transition-all duration-200`}
      >
        <div className="p-4">
          <button
            className="text-xl font-bold dark:text-white focus:outline-none"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? "✕" : "☰"}
          </button>
        </div>
        <nav className={`mt-4 ${sidebarOpen ? "block" : "hidden"} sm:block`}>
          <Link
            href="/admin/users"
            className="block py-2 px-4 hover:bg-gray-200 dark:hover:bg-neutral-700 dark:text-white"
          >
            Users
          </Link>
          <Link
            href="/admin/bookings"
            className="block py-2 px-4 hover:bg-gray-200 dark:hover:bg-neutral-700 dark:text-white"
          >
            Bookings
          </Link>
          <Link
            href="/admin/riders"
            className="block py-2 px-4 hover:bg-gray-200 dark:hover:bg-neutral-700 dark:text-white"
          >
            Riders
          </Link>
          <Link
            href="/admin/shipments"
            className="block py-2 px-4 hover:bg-gray-200 dark:hover:bg-neutral-700 dark:text-white"
          >
            Shipments
          </Link>
          <Link
            href="/admin/update-status"
            className="block py-2 px-4 hover:bg-gray-200 dark:hover:bg-neutral-700 dark:text-white"
          >
            Update Status
          </Link>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto p-4 sm:p-8">{children}</div>
    </div>
  );
};

export default AdminLayoutClient;
