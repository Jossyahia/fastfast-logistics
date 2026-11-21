import { MapPinIcon, PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

export default function ContactInfo() {
  return (
    <div className="rounded-lg bg-neutral-100 p-6 transition-colors duration-200 dark:bg-neutral-900">
      <h2 className="mb-4 text-2xl font-semibold">Get in Touch</h2>
      <div className="space-y-4">
        <div className="flex items-center">
          <MapPinIcon className="mr-2 h-6 w-6 text-blue-600" />
          <p>Serving Sapele, Warri and Asaba, Delta State</p>
        </div>
        <div className="flex items-center">
          <PhoneIcon className="mr-2 h-6 w-6 text-blue-600" />
          <a href="tel:+2348156067874">+234 815 606 7874</a>
        </div>
        <div className="flex items-center">
          <EnvelopeIcon className="mr-2 h-6 w-6 text-blue-600" />
          <a href="mailto:fastfastlogisticsservices@gmail.com">fastfastlogisticsservices@gmail.com</a>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="mb-2 text-xl font-semibold">Delivery Information</h3>
        <p>Pay on Delivery is available in Sapele, Warri and Asaba.</p>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
          Deliveries operate within each individual city. Same-day delivery is available where service conditions allow.
        </p>
      </div>
    </div>
  );
}
