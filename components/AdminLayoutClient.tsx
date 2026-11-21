"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu, X, Users, Calendar, Bike, Package, RefreshCw, FileText,
  LayoutDashboard, ChevronRight, Globe, MoreHorizontal, ExternalLink,
} from "lucide-react";

const navItems = [
  { href: "/admin/dashboard", label: "Overview", short: "Home", icon: LayoutDashboard },
  { href: "/admin/blog", label: "Blog Studio", short: "Blog", icon: FileText },
  { href: "/admin/bookings", label: "Bookings", short: "Bookings", icon: Calendar },
  { href: "/admin/riders", label: "Riders", short: "Riders", icon: Bike },
  { href: "/admin/users", label: "Customers", short: "Customers", icon: Users },
  { href: "/admin/shipments", label: "Shipments", short: "Shipments", icon: Package },
  { href: "/admin/update-status", label: "Update Status", short: "Status", icon: RefreshCw },
];

const AdminLayoutClient = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const active = (href: string) => href === "/admin/dashboard" ? pathname === href : pathname.startsWith(href);

  const NavLink = ({ item, mobile = false }: { item: typeof navItems[number]; mobile?: boolean }) => {
    const Icon = item.icon;
    return (
      <Link href={item.href} onClick={() => { setDrawerOpen(false); setMoreOpen(false); }}
        aria-current={active(item.href) ? "page" : undefined}
        className={`group flex items-center gap-3 rounded-2xl font-semibold transition-all ${mobile ? "min-h-14 px-3 py-3 text-sm" : "px-3 py-3 text-sm"} ${active(item.href) ? "bg-indigo-600 text-white shadow-lg shadow-indigo-950/15" : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"}`}>
        <Icon className="h-5 w-5 shrink-0" />
        <span>{item.label}</span>
        {active(item.href) && <ChevronRight className="ml-auto h-4 w-4" />}
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-[#f5f6fb] text-neutral-900 dark:bg-[#090d18] dark:text-white">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <aside className="sticky top-0 hidden h-screen w-[264px] shrink-0 flex-col border-r border-neutral-200 bg-white/90 px-4 py-5 backdrop-blur-xl dark:border-neutral-800 dark:bg-neutral-950/90 md:flex">
          <Link href="/admin/dashboard" className="mb-8 flex items-center gap-3 rounded-2xl px-2 py-2">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-fuchsia-600 text-lg font-black text-white">FF</span>
            <span><span className="block text-base font-extrabold">FastFast</span><span className="block text-xs font-medium tracking-wide text-neutral-500">ADMIN WORKSPACE</span></span>
          </Link>
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">Workspace</p>
          <nav className="flex flex-1 flex-col gap-1.5">{navItems.map(item => <NavLink key={item.href} item={item} />)}</nav>
          <Link href="/" target="_blank" className="mt-4 flex items-center gap-3 rounded-2xl border border-neutral-200 px-3 py-3 text-sm font-semibold text-neutral-600 transition hover:bg-neutral-50 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-900">
            <Globe className="h-5 w-5" /> View live website <ExternalLink className="ml-auto h-4 w-4" />
          </Link>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 flex h-[68px] items-center justify-between border-b border-neutral-200/80 bg-white/90 px-4 backdrop-blur-xl dark:border-neutral-800 dark:bg-neutral-950/90 sm:px-6">
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => setDrawerOpen(true)} aria-label="Open admin navigation" className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 md:hidden dark:border-neutral-700"><Menu className="h-5 w-5" /></button>
              <div><p className="text-sm font-extrabold tracking-tight">FastFast Workspace</p><p className="hidden text-[11px] text-neutral-500 sm:block">Manage deliveries and customer content</p></div>
            </div>
            <Link href="/" target="_blank" className="inline-flex items-center gap-2 rounded-xl bg-neutral-100 px-3 py-2 text-xs font-bold text-neutral-700 transition hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"><Globe className="h-4 w-4" /><span className="hidden sm:inline">View website</span><ExternalLink className="h-3 w-3" /></Link>
          </header>

          <main className="mx-auto w-full max-w-[1320px] px-3 py-5 pb-28 sm:px-6 sm:py-7 md:pb-10 lg:px-8">{children}</main>
        </div>
      </div>

      <nav aria-label="Quick admin navigation" className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-white/95 px-2 pb-[max(env(safe-area-inset-bottom),8px)] pt-2 shadow-[0_-8px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-neutral-800 dark:bg-neutral-950/95 md:hidden">
        <div className="mx-auto grid max-w-lg grid-cols-4 gap-1">
          {navItems.slice(0, 4).map(item => {
            const Icon = item.icon;
            return <Link key={item.href} href={item.href} aria-current={active(item.href) ? "page" : undefined} className={`flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl px-1 text-[10px] font-bold transition ${active(item.href) ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-200" : "text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-900"}`}><Icon className="h-5 w-5" /><span>{item.short}</span></Link>;
          })}
          <button type="button" onClick={() => setMoreOpen(v => !v)} aria-expanded={moreOpen} className={`flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl px-1 text-[10px] font-bold ${moreOpen ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-200" : "text-neutral-500 dark:text-neutral-400"}`}><MoreHorizontal className="h-5 w-5" /><span>More</span></button>
        </div>
      </nav>

      {drawerOpen && <>
        <button type="button" aria-label="Close admin navigation" onClick={() => setDrawerOpen(false)} className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden" />
        <aside className="fixed inset-y-0 left-0 z-[60] flex w-[min(86vw,320px)] flex-col bg-white p-5 shadow-2xl dark:bg-neutral-950 md:hidden">
          <div className="mb-7 flex items-center justify-between"><span className="text-lg font-extrabold">Admin menu</span><button type="button" onClick={() => setDrawerOpen(false)} aria-label="Close menu" className="rounded-xl border p-2 dark:border-neutral-700"><X className="h-5 w-5" /></button></div>
          <nav className="flex flex-col gap-2">{navItems.map(item => <NavLink key={item.href} item={item} mobile />)}</nav>
          <Link href="/" onClick={() => setDrawerOpen(false)} className="mt-auto flex items-center gap-3 rounded-2xl border p-3 text-sm font-semibold dark:border-neutral-800"><Globe className="h-5 w-5" /> View live website <ExternalLink className="ml-auto h-4 w-4" /></Link>
        </aside>
      </>}
      {moreOpen && <>
        <button type="button" aria-label="Close more navigation" onClick={() => setMoreOpen(false)} className="fixed inset-0 z-40 bg-black/30 md:hidden" />
        <div className="fixed inset-x-3 bottom-[calc(76px+env(safe-area-inset-bottom))] z-50 rounded-3xl border border-neutral-200 bg-white p-3 shadow-2xl dark:border-neutral-800 dark:bg-neutral-900 md:hidden">
          <p className="px-3 pb-2 pt-1 text-xs font-bold uppercase tracking-wider text-neutral-400">More tools</p>
          <div className="grid grid-cols-2 gap-2">{navItems.slice(4).map(item => <NavLink key={item.href} item={item} mobile />)}</div>
        </div>
      </>}
    </div>
  );
};

export default AdminLayoutClient;
