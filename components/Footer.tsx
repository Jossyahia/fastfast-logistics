import Link from "next/link";
import { MapPin, MessageCircle, ArrowUpRight } from "lucide-react";

const serviceAreas = ["Sapele", "Warri", "Asaba", "Oghara", "Koko"];

export const Footer = () => {
  return (
    <footer className="w-full border-t border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 md:grid-cols-[1.2fr_1fr_1fr] md:py-12">
        <div>
          <Link href="/" className="inline-flex items-center text-xl font-black tracking-tight text-neutral-900 dark:text-white">FastFast<span className="ml-1 text-indigo-600">.</span></Link>
          <p className="mt-3 max-w-sm text-sm leading-6 text-neutral-500 dark:text-neutral-400">Your Express Lane to Seamless Shipping. Local package delivery for individuals and online vendors across selected Delta State locations.</p>
          <a href="https://wa.me/2348156067874" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"><MessageCircle className="h-4 w-4" /> Chat on WhatsApp <ArrowUpRight className="h-4 w-4" /></a>
        </div>
        <div>
          <h2 className="text-xs font-extrabold uppercase tracking-[0.16em] text-neutral-400">Explore</h2>
          <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3 text-sm font-semibold">
            <Link href="/services" className="text-neutral-600 hover:text-indigo-600 dark:text-neutral-300">Services</Link>
            <Link href="/booking" className="text-neutral-600 hover:text-indigo-600 dark:text-neutral-300">Book delivery</Link>
            <Link href="/tracking" className="text-neutral-600 hover:text-indigo-600 dark:text-neutral-300">Track parcel</Link>
            <Link href="/blog" className="text-neutral-600 hover:text-indigo-600 dark:text-neutral-300">Delivery tips</Link>
            <Link href="/about" className="text-neutral-600 hover:text-indigo-600 dark:text-neutral-300">About us</Link>
            <Link href="/contact-us" className="text-neutral-600 hover:text-indigo-600 dark:text-neutral-300">Contact</Link>
            <Link href="/privacy" className="text-neutral-600 hover:text-indigo-600 dark:text-neutral-300">Privacy</Link>
            <Link href="/terms" className="text-neutral-600 hover:text-indigo-600 dark:text-neutral-300">Terms</Link>
          </div>
        </div>
        <div>
          <h2 className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.16em] text-neutral-400"><MapPin className="h-3.5 w-3.5" /> Local coverage</h2>
          <div className="mt-4 flex flex-wrap gap-2">{serviceAreas.map(area => <span key={area} className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs font-bold text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300">{area}</span>)}</div>
          <p className="mt-3 text-xs leading-5 text-neutral-500 dark:text-neutral-400">Deliveries are local within each listed area. Vendor-arranged Pay on Delivery is available across all five main service areas. Contact us to confirm your exact pickup and drop-off points.</p>
        </div>
      </div>
      <div className="border-t border-neutral-100 px-5 py-4 dark:border-neutral-900">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} FastFast Logistics Services. All rights reserved.</span>
          <span>Delta State, Nigeria</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
