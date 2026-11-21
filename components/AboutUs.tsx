import Link from "next/link";
import { ArrowRight, MapPin, PackageCheck, MessageCircle, ShieldCheck } from "lucide-react";

const values = [
  { title: "Local knowledge", description: "We focus on the communities we serve and confirm pickup and delivery details before dispatch.", icon: MapPin },
  { title: "Clear communication", description: "We encourage customers and vendors to agree on addresses, payment expectations and delivery arrangements before dispatch.", icon: MessageCircle },
  { title: "Convenient delivery", description: "We help individuals and online sellers arrange local package delivery and rider pickup.", icon: PackageCheck },
  { title: "Straightforward service", description: "We communicate service coverage and availability clearly instead of promising what has not been confirmed.", icon: ShieldCheck },
];

export default function AboutUsContent() {
  return (
    <div className="bg-neutral-100 dark:bg-neutral-900">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        <section className="grid items-stretch gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl bg-[#11172b] p-6 text-left text-white shadow-xl sm:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-200">About FastFast</p>
            <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">Local delivery that helps people and businesses keep moving.</h2>
            <p className="mt-5 text-sm leading-7 text-slate-300 sm:text-base">FastFast Logistics Services helps individuals and online vendors arrange package delivery within selected locations in Delta State. We focus on practical local delivery, convenient pickup arrangements and helping online sellers coordinate orders with their customers.</p>
            <div className="mt-6 flex flex-wrap gap-2">{["Sapele", "Warri", "Asaba", "Oghara", "Koko"].map(area => <span key={area} className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold text-white">{area}</span>)}</div>
            <p className="mt-4 text-xs leading-5 text-slate-300">Deliveries are local within each listed area. Pay on Delivery is confirmed in Sapele, Warri and Asaba; contact us to confirm availability in Oghara and Koko.</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/booking" className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-5 py-3 text-sm font-bold text-white">Book a delivery <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/contact-us" className="inline-flex items-center justify-center rounded-xl border border-white/25 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10">Talk to FastFast</Link>
            </div>
          </div>
          <div className="flex flex-col justify-between rounded-3xl border border-neutral-200 bg-white p-6 text-left shadow-sm dark:border-neutral-800 dark:bg-neutral-950 sm:p-8">
            <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">Our purpose</p><h3 className="mt-3 text-2xl font-extrabold">Make local delivery easier to arrange.</h3><p className="mt-4 text-sm leading-7 text-neutral-600 dark:text-neutral-300">From a personal package to an online order, we want customers to understand where we operate, how to request a rider and what details to prepare before a delivery.</p></div>
            <div className="mt-8 rounded-2xl bg-indigo-50 p-4 dark:bg-indigo-950/40"><p className="text-sm font-extrabold text-indigo-950 dark:text-indigo-100">For online vendors</p><p className="mt-2 text-sm leading-6 text-neutral-700 dark:text-neutral-200">Clear customer details, agreed payment expectations and accurate addresses help create a smoother delivery experience.</p><Link href="/blog" className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-indigo-700 dark:text-indigo-300">Read vendor delivery tips <ArrowRight className="h-4 w-4" /></Link></div>
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-5 text-left"><p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">What guides us</p><h3 className="mt-2 text-2xl font-extrabold">The way we work</h3></div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ title, description, icon: Icon }) => <article key={title} className="rounded-2xl border border-neutral-200 bg-white p-5 text-left shadow-sm dark:border-neutral-800 dark:bg-neutral-950"><span className="inline-flex rounded-xl bg-indigo-50 p-3 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300"><Icon className="h-5 w-5" /></span><h4 className="mt-4 font-extrabold">{title}</h4><p className="mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-300">{description}</p></article>)}
          </div>
        </section>
      </div>
    </div>
  );
}
