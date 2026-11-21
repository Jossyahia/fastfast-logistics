import React from "react";
import Link from "next/link";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { Status } from "@prisma/client";
import { redirect } from "next/navigation";
import { Users, CalendarDays, FileText, Bike, Package, ArrowUpRight, MapPin, Sparkles } from "lucide-react";

interface DashboardStats {
  totalUsers: number;
  totalBookings: number;
  bookingsByStatus: { status: Status; count: number }[];
}

export const revalidate = 60;

const DashboardPage = async () => {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") redirect("/restricted");

  try {
    const [totalUsers, totalBookings, bookingsByStatus] = await Promise.all([
      prisma.user.count(),
      prisma.booking.count(),
      prisma.booking.groupBy({ by: ["status"], _count: { status: true } }),
    ]);

    const stats: DashboardStats = {
      totalUsers,
      totalBookings,
      bookingsByStatus: bookingsByStatus.map((b) => ({ status: b.status, count: b._count.status })),
    };

    const shortcuts = [
      { href: "/admin/blog", label: "Blog Studio", description: "Write, edit and publish website articles", icon: FileText, accent: "from-indigo-600 to-violet-600" },
      { href: "/admin/bookings", label: "Manage bookings", description: "Review delivery requests and booking details", icon: CalendarDays, accent: "from-sky-600 to-blue-600" },
      { href: "/admin/riders", label: "Rider management", description: "View rider records and assignments", icon: Bike, accent: "from-emerald-600 to-teal-600" },
      { href: "/admin/shipments", label: "Shipments", description: "Review shipment records and delivery progress", icon: Package, accent: "from-fuchsia-600 to-pink-600" },
    ];

    return (
      <div className="mx-auto max-w-6xl space-y-6 sm:space-y-8">
        <section className="relative isolate overflow-hidden rounded-[28px] bg-[#11172b] p-5 text-white shadow-xl sm:p-8">
          <div className="absolute -right-16 -top-20 -z-10 h-64 w-64 rounded-full bg-indigo-500/30 blur-3xl" />
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-100"><Sparkles className="h-3.5 w-3.5" /> Operations overview</div>
          <h1 className="mt-4 text-2xl font-black tracking-tight sm:text-4xl">Welcome to your FastFast workspace.</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">A mobile-friendly place to manage customer activity, delivery operations and the content that brings new customers to your website.</p>
          <div className="mt-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-300"><span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-2"><MapPin className="h-3.5 w-3.5" /> Sapele · Warri · Asaba · Oghara · Koko</span></div>
        </section>

        <section className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <StatCard title="Total customers" value={stats.totalUsers} icon={Users} tone="indigo" />
          <StatCard title="Total bookings" value={stats.totalBookings} icon={CalendarDays} tone="blue" />
          {stats.bookingsByStatus.map((stat) => <StatCard key={stat.status} title={`Bookings ${formatStatus(stat.status)}`} value={stat.count} icon={Package} tone="neutral" />)}
        </section>

        <section>
          <div className="mb-4"><h2 className="text-lg font-extrabold sm:text-xl">Quick actions</h2><p className="mt-1 text-xs text-neutral-500 sm:text-sm">Jump straight to the work you need to do.</p></div>
          <div className="grid gap-3 sm:grid-cols-2">
            {shortcuts.map(({ href, label, description, icon: Icon, accent }) => <Link key={href} href={href} className="group flex items-center gap-4 rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900 sm:p-5"><span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${accent} text-white shadow-md`}><Icon className="h-5 w-5" /></span><span className="min-w-0 flex-1"><span className="block font-extrabold">{label}</span><span className="mt-1 block text-xs leading-5 text-neutral-500">{description}</span></span><ArrowUpRight className="h-4 w-4 shrink-0 text-neutral-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-indigo-600" /></Link>)}
          </div>
        </section>
      </div>
    );
  } catch (error) {
    console.error("Failed to load dashboard data:", error);
    return <div className="rounded-3xl border border-red-200 bg-red-50 p-5 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300"><h1 className="font-bold">Dashboard data could not be loaded</h1><p className="mt-1">Please refresh the page or try again shortly.</p></div>;
  }
};

function StatCard({ title, value, icon: Icon, tone }: { title: string; value: number; icon: React.ElementType; tone: "indigo" | "blue" | "neutral" }) {
  const tones = {
    indigo: "bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300",
    blue: "bg-sky-50 text-sky-600 dark:bg-sky-950 dark:text-sky-300",
    neutral: "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300",
  };
  return <div className="rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 sm:p-5"><span className={`mb-3 flex h-9 w-9 items-center justify-center rounded-xl ${tones[tone]}`}><Icon className="h-4 w-4" /></span><p className="text-[11px] font-semibold text-neutral-500 sm:text-sm">{title}</p><p className="mt-1 text-2xl font-black tabular-nums sm:text-3xl">{value}</p></div>;
}

const formatStatus = (status: Status): string => {
  switch (status) {
    case Status.PROCESSING: return "Processing";
    case Status.SHIPPED: return "Shipped";
    case Status.IN_TRANSIT: return "In Transit";
    case Status.DELIVERED: return "Delivered";
    case Status.RETURNED: return "Returned";
    case Status.CANCELLED: return "Cancelled";
    default: return status;
  }
};

export default DashboardPage;
