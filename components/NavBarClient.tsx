"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/ModeToggle";
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
  X,
  Menu,
  Bike,
  FileText,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { serverSignIn, serverSignOut } from "@/app/actions/auth";
import { useSession } from "next-auth/react";

type UserRole = "USER" | "RIDER" | "ADMIN";

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

interface UserData {
  name: string;
  role: UserRole;
  image?: string;
}

const NavBarClient: React.FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);


    const fetchUserData = useCallback(async () => {
      try {
        const response = await fetch("/api/user");
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }, []);

    useEffect(() => {
      if (session) {
        fetchUserData();
      } else {
        setUserData(null);
      }
    }, [session, fetchUserData]);

    const handleAuth = useCallback(async () => {
      setIsLoading(true);
      try {
        if (userData) {
          await serverSignOut();
          setUserData(null);
          router.push("/");
          router.refresh();
        } else {
          await serverSignIn();
          router.refresh();
        }
      } catch (error) {
        console.error("Authentication error:", error);
      } finally {
        setIsLoading(false);
      }
    }, [userData, router]);

  const isAdmin = userData?.role === "ADMIN";
  const isRider = userData?.role === "RIDER";

  const navItems: NavItem[] = useMemo(() => {
    if (isAdmin) {
      return [
        { href: "/admin/dashboard", label: "Admin Dashboard", icon: Settings },
        { href: "/admin/ViewAllUsers", label: "View All Users", icon: Users },
        {
          href: "/admin/ViewAllBookings",
          label: "View All Bookings",
          icon: BookOpen,
        },
        {
          href: "/admin/coupons",
          label: "Coupons",
          icon: BookOpen,
        },
        {
          href: "/admin/update-status",
          label: "Update Status",
          icon: RefreshCw,
        },
      ];
    } else if (isRider) {
      return [
        { href: "/", label: "Home", icon: Home },
        { href: "/rider/dashboard", label: "Rider", icon: Bike },
        { href: "/rider/dashboard/task", label: "Task", icon: FileText },
        { href: "/contact-us", label: "Contact", icon: Mail },
        { href: "/about", label: "About", icon: Info },
      ];
    } else {
      return [
        { href: "/", label: "Home", icon: Home },
        { href: "/services", label: "Services", icon: Package },
        { href: "/booking", label: "Booking", icon: Calendar },
        { href: "/tracking", label: "Tracking", icon: MapPin },
        { href: "/contact-us", label: "Contact", icon: Mail },
        { href: "/about", label: "About", icon: Info },
      ];
    }
  }, [isAdmin, isRider]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const toggleProfileMenu = useCallback(() => {
    setIsProfileMenuOpen((prev) => !prev);
  }, []);

  const closeProfileMenu = useCallback(() => {
    setIsProfileMenuOpen(false);
  }, []);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeProfileMenu();
      }
    },
    [closeProfileMenu]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const displayName = userData?.name || "";
  const image = userData?.image || "";

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex items-center justify-between w-full">
            <div className="flex-shrink-0">
              <Link href="/">
                <Logo className="text-5xl font-signature" />
              </Link>
            </div>
            <div className="hidden sm:block">
              <div className="flex space-x-4">
                {navItems.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className="text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center transition duration-150 ease-in-out"
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-center">
              {userData ? (
                <div className="relative ml-3" ref={dropdownRef}>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleProfileMenu}
                  >
                    <span className="sr-only">Open user menu</span>
                    {image ? (
                      <Image
                        src={image}
                        alt={displayName}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-base font-medium text-gray-700 dark:text-gray-300">
                        {displayName.charAt(0)}
                      </div>
                    )}
                  </Button>
                  {isProfileMenuOpen && (
                    <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-neutral-100 dark:bg-neutral-900 transition-colors duration-200">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm"
                        onClick={closeProfileMenu}
                      >
                        Your Profile
                      </Link>
                      <Link
                        href="/profile/edit"
                        className="block px-4 py-2 text-sm"
                        onClick={closeProfileMenu}
                      >
                        Update Profile
                      </Link>
                      <button
                        onClick={() => {
                          closeProfileMenu();
                          handleAuth();
                        }}
                        className="block w-full text-left px-4 py-2 text-sm"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Button
                  onClick={handleAuth}
                  disabled={isLoading}
                  variant="default"
                  className="ml-3"
                >
                  {isLoading ? "Loading..." : "Sign in"}
                </Button>
              )}

              <ModeToggle className="ml-3" />
            </div>
          </div>

          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center transition duration-150 ease-in-out"
                onClick={toggleMobileMenu}
              >
                <Icon className="mr-2 h-4 w-4" />
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBarClient;
