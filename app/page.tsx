import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  TruckIcon,
  MapPinIcon,
  ShieldCheckIcon,
  PhoneIcon,
  MailIcon,
  WalletIcon,
  BadgeCheckIcon,
  HeadphonesIcon,
  LucideProps,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import BookingInstructionsModal from "@/components/BookingInstructionsModal";
import TestimonialSection from "@/components/TestimonialSection";

export const metadata: Metadata = {
  title: "Local Delivery in Sapele, Warri, Asaba, Oghara and Koko",
  description: "FastFast Logistics provides local package delivery for individuals and online vendors in Sapele, Warri, Asaba, Oghara and Koko, Delta State.",
  alternates: { canonical: "/" },
};

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<LucideProps>;
  href: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  href,
}) => (
  <Link href={href} passHref>
    <Card className="cursor-pointer bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border-2 border-transparent hover:border-indigo-500">
      <CardHeader>
        <Icon className="w-12 h-12 mb-4 text-indigo-500" />
        <CardTitle className="text-xl md:text-2xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-neutral-600 dark:text-neutral-300">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  </Link>
);

export default function EnhancedLandingPage() {
  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white transition-colors duration-200">
      <main className="container mx-auto px-4 py-16 md:py-24">
        <BookingInstructionsModal />

        <section className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            Fastfast Logistics Services
          </h1>
          <p className="text-xl md:text-2xl mb-4 max-w-3xl mx-auto">
            Your Express Lane to Seamless Shipping. Local delivery for individuals and
            online vendors across five main Delta State service areas, with Pay on Delivery available in all five.
          </p>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-neutral-600 dark:text-neutral-300">
            FastFast supports local deliveries within Sapele, Warri, Asaba, Oghara and Koko. Book a
            rider and arrange package pickup within your town. Pay on Delivery is
            available in Sapele, Warri and Asaba. Ask us to confirm payment options
            for Oghara and Koko. Same-day delivery is available where service conditions allow.
          </p>
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
            <Link href="/request" passHref>
              <Button
                size="lg"
                className="text-lg px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Instant Pickup
              </Button>
            </Link>
            <Link href="/booking" passHref>
              <Button
                size="lg"
                className="text-lg px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Book a rider Now
              </Button>
            </Link>
          </div>
        </section>

        <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-16">
          <FeatureCard
            title="Quick Booking"
            description="Schedule your shipments with ease using our intuitive booking system."
            icon={TruckIcon}
            href="/booking"
          />
          <FeatureCard
            title="Shipment Tracking"
            description="Check the progress of your shipment using your tracking details."
            icon={MapPinIcon}
            href="/tracking"
          />
          <FeatureCard
            title="How to Book Delivery"
            description="Easy Step By Step Guide On How To Book A delivery And Save Money"
            icon={ShieldCheckIcon}
            href="/booking-guide"
          />
        </section>

        <section className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Why Choose FastFast Logistics?
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center space-x-4">
              <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full">
                <WalletIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="font-semibold">Secure POD</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  Pay on Delivery for eligible local orders
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full">
                <BadgeCheckIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="font-semibold">Local City Coverage</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  Deliveries within Sapele, Warri, Asaba, Oghara and Koko
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full">
                <HeadphonesIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="font-semibold">Pay on Delivery</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  Available for local deliveries in Sapele, Warri and Asaba
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-indigo-600 dark:text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Same-Day Options</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  Same-day delivery where available
                </p>
              </div>
            </div>
          </div>
        </section>

        <TestimonialSection />
        <section
          id="contact-us"
          className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg shadow-lg p-8"
        >
          <h2 className="text-3xl font-bold mb-6 text-center">Contact Us</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Link
              href="tel:+2348156067874"
              className="flex items-center space-x-4"
            >
              <PhoneIcon className="w-6 h-6" />
              <span>08156067874</span>
            </Link>
            <Link
              href="mailto:fastfastlogisticsservices@gmail.com"
              className="flex items-center space-x-4"
            >
              <MailIcon className="w-6 h-6" />
              <span>fastfastlogisticsservices@gmail.com</span>
            </Link>
            <Link
              href="https://wa.me/2348156067874"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-4"
            >
              <FaWhatsapp className="w-6 h-6" />
              <span>WhatsApp: 08156067874</span>
            </Link>


          </div>
        </section>
      </main>
    </div>
  );
}
