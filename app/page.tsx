import React from "react";
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
  LucideProps,
} from "lucide-react";
import { FaWhatsapp, FaFacebook, FaInstagram } from "react-icons/fa";
import { FaSquareThreads } from "react-icons/fa6";

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
        <section className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            FastFast Logistics Services
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Your Express Lane to Seamless Shipping We're not just fast—we're
            FastFast. Specializing in rapid, reliable logistics solutions for
            businesses of all sizes. From local deliveries to global shipments,
            we're revolutionizing the way you move goods.
          </p>
          <Link href="/booking" passHref>
            <Button
              size="lg"
              className="text-lg px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Book Your Shipping Now
            </Button>
          </Link>
        </section>

        <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-16">
          <FeatureCard
            title="Quick Booking"
            description="Schedule your shipments with ease using our intuitive booking system."
            icon={TruckIcon}
            href="/booking"
          />
          <FeatureCard
            title="Real-time Tracking"
            description="Stay informed with up-to-the-minute updates on your shipment's location."
            icon={MapPinIcon}
            href="/tracking"
          />
          <FeatureCard
            title="Secure Delivery"
            description="Rest easy knowing your packages are handled with care and delivered safely."
            icon={ShieldCheckIcon}
            href="/security"
          />
        </section>

        <section className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Why Choose FastFast Logistics?
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                <h3 className="font-semibold">Lightning Fast</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  Speedy deliveries, always on time
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
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Cost-Effective</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  Competitive prices for all services
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
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Secure & Reliable</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  Your packages are in safe hands
                </p>
              </div>
            </div>
          </div>
        </section>

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
              <span>+234(815) 606-7874</span>
            </Link>
            <Link
              href="mailto:support@fastfast.com.ng"
              className="flex items-center space-x-4"
            >
              <MailIcon className="w-6 h-6" />
              <span>support@fastfast.com.ng</span>
            </Link>
            <Link
              href="https://wa.me/2348097034355"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-4"
            >
              <FaWhatsapp className="w-6 h-6" />
              <span>WhatsApp: +234(809) 703-4355</span>
            </Link>
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-4"
            >
              <FaFacebook className="w-6 h-6" />
              <span>Facebook: FastFast Logistics</span>
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-4"
            >
              <FaInstagram className="w-6 h-6" />
              <span>Instagram: @fastfastlogistics</span>
            </Link>
            <Link
              href="https://threads.net"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-4"
            >
              <FaSquareThreads className="w-6 h-6" />
              <span>Threads: @fastfastlogistics</span>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
