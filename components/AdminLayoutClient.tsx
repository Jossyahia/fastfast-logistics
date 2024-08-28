"use client"
import React, { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Users,
  Calendar,
  Bike,
  Package,
  RefreshCw,
} from "lucide-react";

const AdminLayoutClient = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { href: "/admin/users", label: "Users", icon: Users },
    { href: "/admin/bookings", label: "Bookings", icon: Calendar },
    { href: "/admin/riders", label: "Riders", icon: Bike },
    { href: "/admin/shipments", label: "Shipments", icon: Package },
    { href: "/admin/update-status", label: "Update Status", icon: RefreshCw },
  ];

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-white dark:bg-gray-800 shadow-lg flex flex-col transition-all duration-200 ease-in-out`}
      >
        <div className="p-4 flex justify-between items-center">
          <button
            className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          {sidebarOpen && (
            <span className="text-lg font-semibold text-gray-800 dark:text-white">
              Admin
            </span>
          )}
        </div>
        <nav className="mt-8 flex flex-col flex-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center py-3 px-4 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors duration-150 ease-in-out ${
                sidebarOpen ? "justify-start" : "justify-center"
              }`}
            >
              <item.icon size={20} />
              {sidebarOpen && <span className="ml-4">{item.label}</span>}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto px-4 py-8">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayoutClient;
