import { MapPinIcon, PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

export default function ContactInfo() {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition-colors dark:border-neutral-800 dark:bg-neutral-900 sm:p-8">
      <h2 className="mb-5 text-2xl font-extrabold">Get in Touch</h2>
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <MapPinIcon className="mt-0.5 h-6 w-6 shrink-0 text-indigo-600" />
          <div><p className="font-semibold">Local delivery coverage</p><p className="mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-300">Sapele, Warri, Asaba, Oghara and Koko, Delta State.</p></div>
        </div>
        <div className="flex items-center gap-3">
          <PhoneIcon className="h-6 w-6 shrink-0 text-indigo-600" />
          <a className="font-semibold hover:text-indigo-600" href="tel:+2348156067874">+234 815 606 7874</a>
        </div>
        <div className="flex items-start gap-3">
          <EnvelopeIcon className="mt-0.5 h-6 w-6 shrink-0 text-indigo-600" />
          <a className="break-all text-sm font-semibold hover:text-indigo-600" href="mailto:fastfastlogisticsservices@gmail.com">fastfastlogisticsservices@gmail.com</a>
        </div>
      </div>
      <div className="mt-7 rounded-2xl bg-indigo-50 p-4 dark:bg-indigo-950/40">
        <h3 className="font-bold">Before you book</h3>
        <p className="mt-2 text-sm leading-6 text-neutral-700 dark:text-neutral-200">Our main service hubs are Sapele, Warri, Asaba, Oghara and Koko, plus surrounding communities where pickup and drop-off can be confirmed. Pay on Delivery is available across all five main areas. Deliveries are local within each service area; same-day delivery depends on availability.</p>
      </div>
    </div>
  );
}
