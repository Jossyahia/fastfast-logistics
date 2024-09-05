"use client";
import React, { useMemo, useCallback, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  LogOut,
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import ModeToggle from "@/components/ModeToggle";
import { serverSignIn, serverSignOut } from "@/app/actions/auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Role } from "@prisma/client";
import { revalidate } from "./../app/admin/dashboard/page";

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

interface NavBarClientProps {
  user: {
    name: string;
    role: Role;
    image?: string;
  } | null;
}

const NavLink: React.FC<{ href: string; children: React.ReactNode }> =
  React.memo(({ href, children }) => {
    const pathname = usePathname();
    const isActive = pathname === href || pathname.startsWith(`${href}/`);

    return (
      <Link
        href={href}
        className={`text-sm font-medium transition-colors hover:text-primary px-3 py-2 rounded-md ${
          isActive
            ? "text-primary bg-accent"
            : "text-muted-foreground hover:bg-accent/50"
        }`}
        aria-current={isActive ? "page" : undefined}
      >
        {children}
      </Link>
    );
  });

const NavBarClient: React.FC<NavBarClientProps> = ({ user }) => {
  const router = useRouter();
  const isAdmin = user?.role === "ADMIN";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const regularNavItems: NavItem[] = useMemo(
    () => [
      { href: "/", label: "Home", icon: Home },
      { href: "/services", label: "Services", icon: Package },
      { href: "/booking", label: "Booking", icon: Calendar },
      { href: "/tracking", label: "Tracking", icon: MapPin },
      { href: "/contact-us", label: "Contact", icon: Mail },
      { href: "/about", label: "About", icon: Info },
    ],
    []
  );

  const adminNavItems: NavItem[] = useMemo(
    () => [
      { href: "/admin/dashboard", label: "Admin Dashboard", icon: Settings },
      { href: "/admin/ViewAllUsers", label: "View All Users", icon: Users },
      {
        href: "/admin/ViewAllBookings",
        label: "View All Bookings",
        icon: BookOpen,
      },
      { href: "/admin/update-status", label: "Update Status", icon: RefreshCw },
    ],
    []
  );

  const navItems = useMemo(
    () => (isAdmin ? adminNavItems : regularNavItems),
    [isAdmin, adminNavItems, regularNavItems]
  );

 const handleAuth = useCallback(async () => {
   setIsLoading(true);
   try {
     if (user) {
       await serverSignOut();
       router.push("/"); 
       router.refresh();// Redirect to home page after logout
     } else {
       await serverSignIn();
       router.push("/profile"); 
       router.refresh();// Redirect to profile page after login
     }
   } catch (error) {
     console.error("Authentication error:", error);
     // You can add user-friendly error handling here
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

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo />
          </Link>
          <nav className="flex items-center space-x-1 text-sm font-medium">
            {navItems.map((item) => (
              <NavLink key={item.href} href={item.href}>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
          <span className="sr-only">Toggle Menu</span>
        </Button>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Add search functionality here if needed */}
          </div>
          <nav className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={handleAuth}
              className="flex items-center space-x-2 text-sm hover:bg-accent hover:text-accent-foreground"
              disabled={isLoading}
            >
              {isLoading ? (
                <span>Loading...</span>
              ) : user ? (
                <>
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </>
              ) : (
                <span>Sign in</span>
              )}
            </Button>
            {user && (
              <div className="flex items-center space-x-2">
                <Avatar>
                  {user.image ? (
                    <div className="rounded-full h-20 w-20">
                      <Image
                        src={user.image}
                        alt={user.name}
                        width={72}
                        height={72}
                        className="rounded-full"
                      />
                    </div>
                  ) : (
                    <AvatarFallback>
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>
              </div>
            )}
            <ModeToggle />
          </nav>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-30 hover:bg-gray-200 hover:text-gray-900"
                onClick={closeMobileMenu}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBarClient;
