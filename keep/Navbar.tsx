"use client";

import React, { useMemo, useCallback, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

interface NavBarClientProps {
  user: {
    name: string;
    role: string;
  } | null;
}

const NavLink: React.FC<{ href: string; children: React.ReactNode }> =
  React.memo(({ href, children }) => {
    const pathname = usePathname();
    const isActive = pathname === href || pathname.startsWith(href);

    return (
      <Link
        href={href}
        className={`text-sm font-medium transition-colors hover:text-primary ${
          isActive ? "text-primary" : "text-muted-foreground"
        }`}
        aria-current={isActive ? "page" : undefined}
      >
        {children}
      </Link>
    );
  });

const MobileNavLink: React.FC<{
  item: NavItem;
  onOpenChange: (isOpen: boolean) => void;
}> = React.memo(({ item, onOpenChange }) => {
  const pathname = usePathname();
  const isActive = pathname === item.href || pathname.startsWith(item.href);
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      onClick={() => onOpenChange(false)}
      className={`flex items-center space-x-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${
        isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
      }`}
      aria-current={isActive ? "page" : undefined}
    >
      <Icon className="h-4 w-4" />
      <span>{item.label}</span>
    </Link>
  );
});

const NavBarClient: React.FC<NavBarClientProps> = ({ user }) => {
  const router = useRouter();
  const isAdmin = user?.role === "admin";
  const [isSheetOpen, setSheetOpen] = useState(false);

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
      { href: "/admin", label: "Admin Dashboard", icon: Settings },
      { href: "/admin/view-all-users", label: "View All Users", icon: Users },
      {
        href: "/admin/view-all-bookings",
        label: "View All Bookings",
        icon: BookOpen,
      },
      { href: "/admin/update-status", label: "Update Status", icon: RefreshCw },
    ],
    []
  );

  const navItems = useMemo(
    () => (isAdmin ? [regularNavItems[0], ...adminNavItems] : regularNavItems),
    [isAdmin, adminNavItems, regularNavItems]
  );

  const handleAuth = useCallback(async () => {
    if (user) {
      await serverSignOut();
    } else {
      await serverSignIn();
    }
    router.refresh();
  }, [user, router]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo />
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => (
              <NavLink key={item.href} href={item.href}>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <Link href="/" className="flex items-center space-x-2">
              <Logo />
              <span className="font-bold">FastFast</span>
            </Link>
            <nav className="mt-8 flex flex-col space-y-2">
              {navItems.map((item) => (
                <MobileNavLink
                  key={item.href}
                  item={item}
                  onOpenChange={setSheetOpen}
                />
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Add search functionality here if needed */}
          </div>
          <nav className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={handleAuth}
              className="flex items-center space-x-2 text-sm hover:bg-accent hover:text-accent-foreground"
            >
              {user ? (
                <>
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </>
              ) : (
                <span>Sign in</span>
              )}
            </Button>
            {user && (
              <span className="text-sm text-muted-foreground">
                Welcome, {user.name}
              </span>
            )}
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default NavBarClient;
