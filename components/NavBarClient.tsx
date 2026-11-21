"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/ModeToggle";
import {
  Home, Package, Calendar, MapPin, Mail, Info, Users, BookOpen,
  RefreshCw, Settings, X, Menu, Bike, FileText, ChevronDown, LogOut,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { serverSignIn, serverSignOut } from "@/app/actions/auth";
import { useSession } from "next-auth/react";

type UserRole = "USER" | "RIDER" | "ADMIN";
interface NavItem { href: string; label: string; icon: React.ElementType; }
interface UserData { name: string; role: UserRole; image?: string; }

const NavBarClient: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const fetchUserData = useCallback(async () => {
    try {
      const response = await fetch("/api/user");
      if (!response.ok) throw new Error("Could not load account details");
      setUserData(await response.json());
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, []);

  useEffect(() => {
    if (session) fetchUserData();
    else setUserData(null);
  }, [session, fetchUserData]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isProfileMenuOpen) return;
    const closeOnOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) setIsProfileMenuOpen(false);
    };
    document.addEventListener("mousedown", closeOnOutside);
    return () => document.removeEventListener("mousedown", closeOnOutside);
  }, [isProfileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isMobileMenuOpen]);

  const handleAuth = useCallback(async () => {
    setIsLoading(true);
    try {
      if (userData) {
        await serverSignOut();
        setUserData(null);
        router.push("/");
      } else {
        await serverSignIn();
      }
      router.refresh();
    } catch (error) {
      console.error("Authentication error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [userData, router]);

  const isAdmin = userData?.role === "ADMIN";
  const isRider = userData?.role === "RIDER";
  const navItems: NavItem[] = useMemo(() => {
    if (isAdmin) return [
      { href: "/admin/dashboard", label: "Dashboard", icon: Settings },
      { href: "/admin/blog", label: "Blog Studio", icon: FileText },
      { href: "/admin/ViewAllUsers", label: "Users", icon: Users },
      { href: "/admin/ViewAllBookings", label: "Bookings", icon: BookOpen },
      { href: "/admin/coupons", label: "Coupons", icon: Package },
      { href: "/admin/update-status", label: "Update Status", icon: RefreshCw },
    ];
    if (isRider) return [
      { href: "/", label: "Home", icon: Home },
      { href: "/rider/dashboard", label: "Rider dashboard", icon: Bike },
      { href: "/rider/dashboard/task", label: "My tasks", icon: FileText },
      { href: "/contact-us", label: "Contact", icon: Mail },
      { href: "/blog", label: "Blog", icon: BookOpen },
    ];
    return [
      { href: "/", label: "Home", icon: Home },
      { href: "/services", label: "Services", icon: Package },
      { href: "/booking", label: "Book delivery", icon: Calendar },
      { href: "/tracking", label: "Track parcel", icon: MapPin },
      { href: "/blog", label: "Delivery tips", icon: BookOpen },
      { href: "/contact-us", label: "Contact", icon: Mail },
      { href: "/about", label: "About", icon: Info },
    ];
  }, [isAdmin, isRider]);

  const active = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);
  const displayName = userData?.name || "My account";
  const image = userData?.image || "";

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-neutral-200/80 bg-white/90 shadow-sm backdrop-blur-xl dark:border-neutral-800 dark:bg-neutral-950/90">
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="FastFast Logistics home" className="flex min-w-0 items-center">
          <Logo className="text-4xl font-signature sm:text-5xl" />
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} aria-current={active(href) ? "page" : undefined}
              className={`inline-flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${active(href) ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300" : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"}`}>
              <Icon className="h-4 w-4" />{label}
            </Link>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <ModeToggle className="h-10 w-10 rounded-xl sm:h-11 sm:w-11" />
          {userData ? (
            <div className="relative" ref={profileRef}>
              <button type="button" onClick={() => setIsProfileMenuOpen(v => !v)} aria-expanded={isProfileMenuOpen}
                className="flex h-10 items-center gap-2 rounded-full border border-neutral-200 py-1 pl-1 pr-3 transition hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800">
                {image ? <Image src={image} alt="" width={32} height={32} className="h-8 w-8 rounded-full object-cover" /> :
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200">{displayName.charAt(0).toUpperCase()}</span>}
                <span className="hidden max-w-24 truncate text-sm font-semibold sm:block">{displayName}</span>
                <ChevronDown className="h-4 w-4 text-neutral-500" />
              </button>
              {isProfileMenuOpen && <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border bg-white p-2 shadow-xl dark:border-neutral-700 dark:bg-neutral-900">
                <Link href="/profile" className="block rounded-xl px-3 py-3 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800">Your profile</Link>
                <Link href="/profile/edit" className="block rounded-xl px-3 py-3 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800">Update profile</Link>
                <button type="button" onClick={handleAuth} className="flex w-full items-center gap-2 rounded-xl px-3 py-3 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"><LogOut className="h-4 w-4" /> Sign out</button>
              </div>}
            </div>
          ) : (
            <Button onClick={handleAuth} disabled={isLoading} size="sm" className="hidden rounded-xl px-5 sm:inline-flex">{isLoading ? "Please wait..." : "Sign in"}</Button>
          )}
          {!isAdmin && !isRider && <Link href="/booking" aria-label="Book a delivery" className="inline-flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-3 py-2 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 sm:px-4 sm:py-2.5 sm:text-sm"><span className="sm:hidden">Book</span><span className="hidden sm:inline">Book a delivery</span></Link>}
          <button type="button" onClick={() => setIsMobileMenuOpen(v => !v)} aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={isMobileMenuOpen}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-800 transition hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800 lg:hidden">
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && <>
        <button type="button" aria-label="Close navigation" onClick={() => setIsMobileMenuOpen(false)} className="fixed inset-0 top-[68px] z-40 bg-neutral-950/45 backdrop-blur-[2px] lg:hidden" />
        <div className="absolute inset-x-0 top-full z-50 border-b border-neutral-200 bg-white p-4 shadow-2xl dark:border-neutral-800 dark:bg-neutral-950 lg:hidden">
          <div className="mb-4 flex items-center justify-between rounded-2xl bg-gradient-to-br from-indigo-600 to-fuchsia-600 p-4 text-white">
            <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/75">FastFast Logistics</p><p className="mt-1 text-lg font-bold">Where do you want to go?</p></div>
            <Package className="h-8 w-8 text-white/80" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} aria-current={active(href) ? "page" : undefined} onClick={() => setIsMobileMenuOpen(false)}
                className={`flex min-h-[58px] items-center gap-3 rounded-2xl border p-3 text-sm font-semibold transition ${active(href) ? "border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-200" : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200"}`}>
                <span className="rounded-xl bg-neutral-100 p-2 dark:bg-neutral-800"><Icon className="h-4 w-4" /></span><span>{label}</span>
              </Link>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {!userData && <button type="button" onClick={handleAuth} disabled={isLoading} className="rounded-xl border px-4 py-3 text-sm font-bold dark:border-neutral-700">{isLoading ? "Please wait..." : "Sign in"}</button>}
            {!isAdmin && !isRider && <Link href="/booking" onClick={() => setIsMobileMenuOpen(false)} className="rounded-xl bg-indigo-600 px-4 py-3 text-center text-sm font-bold text-white">Book a delivery</Link>}
            
            {userData && <button type="button" onClick={handleAuth} className="rounded-xl border px-4 py-3 text-sm font-bold text-red-600 dark:border-neutral-700">Sign out</button>}
          </div>
          <p className="mt-4 text-center text-xs text-neutral-500">Local delivery in five main hubs and surrounding communities.</p>
        </div>
      </>}
    </nav>
  );
};

export default NavBarClient;
