// src/components/features/contact/ContactInfo.tsx
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

export default function ContactInfo() {
  return (
    <div className="bg-neutral-100 dark:bg-neutral-900 transition-colors duration-200 p-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
      <div className="space-y-4">
        <div className="flex items-center">
          <MapPinIcon className="h-6 w-6 mr-2 text-blue-600" />
          <p>2 Okoligbe Street, Sapele, Delta State Nigeria</p>
        </div>
        <div className="flex items-center">
          <PhoneIcon className="h-6 w-6 mr-2 text-blue-600" />
          <p>+234(815) 606-7874</p>
        </div>
        <div className="flex items-center">
          <EnvelopeIcon className="h-6 w-6 mr-2 text-blue-600" />
          <p>contact@fastfast.ng.com</p>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Business Hours</h3>
        <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
        <p>Saturday: 10:00 AM - 4:00 PM</p>
        <p>Sunday: Closed</p>
      </div>
    </div>
  );
}
