"use client";

import React, { useMemo, useCallback, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/ModeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Role } from "@prisma/client";

import {
  Home,
  Package,
  Calendar,
  MapPin,
  Mail,
  Info,
  Users,
  BookOpen,
  RefreshCw,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { serverSignIn, serverSignOut } from "@/app/actions/auth";

type UserRole = "USER" | "RIDER" | "ADMIN";

interface User {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role: UserRole;
}

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

interface NavBarClientProps {
  user: User | null;
}

const NavBarClient: React.FC<NavBarClientProps> = ({ user }) => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isAdmin = user?.role === "ADMIN";

  const navItems: NavItem[] = useMemo(
    () =>
      isAdmin
        ? [
            {
              href: "/admin/dashboard",
              label: "Admin Dashboard",
              icon: Settings,
            },
            {
              href: "/admin/ViewAllUsers",
              label: "View All Users",
              icon: Users,
            },
            {
              href: "/admin/ViewAllBookings",
              label: "View All Bookings",
              icon: BookOpen,
            },
            {
              href: "/admin/update-status",
              label: "Update Status",
              icon: RefreshCw,
            },
          ]
        : [
            { href: "/", label: "Home", icon: Home },
            { href: "/services", label: "Services", icon: Package },
            { href: "/booking", label: "Booking", icon: Calendar },
            { href: "/tracking", label: "Tracking", icon: MapPin },
            { href: "/contact-us", label: "Contact", icon: Mail },
            { href: "/about", label: "About", icon: Info },
          ],
    [isAdmin]
  );

  const handleAuth = useCallback(async () => {
    setIsLoading(true);
    try {
      if (user) {
        await serverSignOut();
        router.push("/");
      } else {
        await serverSignIn();
      }
      router.refresh();
    } catch (error) {
      console.error("Authentication error:", error);
      // Add user-friendly error handling here, e.g., toast notification
    } finally {
      setIsLoading(false);
    }
  }, [user, router]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const userInitials = user?.name ? user.name.charAt(0).toUpperCase() : "";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <nav className="flex items-center justify-between h-20 w-full">
          <Link href="/" className="flex-shrink-0">
            <Logo className="text-5xl font-signature" />
          </Link>

          <div className="hidden md:block">
            <ul className="ml-10 flex items-baseline space-x-4">
              {navItems.map(({ href, label, icon: Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center transition duration-150 ease-in-out"
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user && (
              <Avatar>
                {user.image ? (
                  <AvatarImage src={user.image} alt={user.name} />
                ) : (
                  <AvatarFallback>{userInitials}</AvatarFallback>
                )}
              </Avatar>
            )}
            <Button
              onClick={handleAuth}
              disabled={isLoading}
              variant={user ? "destructive" : "default"}
            >
              {isLoading ? "Loading..." : user ? "Logout" : "Login"}
            </Button>
            <ModeToggle />
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </nav>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center transition duration-150 ease-in-out"
                onClick={closeMobileMenu}
              >
                <Icon className="mr-2 h-5 w-5" />
                {label}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
            {user && (
              <div className="flex items-center px-5">
                <Avatar>
                  {user.image ? (
                    <AvatarImage src={user.image} alt={user.name} />
                  ) : (
                    <AvatarFallback>{userInitials}</AvatarFallback>
                  )}
                </Avatar>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800 dark:text-white">
                    {user.name}
                  </div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {user.email}
                  </div>
                </div>
              </div>
            )}
            <div className="mt-3 px-2 space-y-1">
              <Button
                className="w-full justify-start"
                onClick={handleAuth}
                disabled={isLoading}
                variant={user ? "destructive" : "default"}
              >
                {user
                  ? isLoading
                    ? "Loading..."
                    : "Logout"
                  : isLoading
                  ? "Loading..."
                  : "Login"}
              </Button>
              <div className="px-3 py-2">
                <ModeToggle />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBarClient;
