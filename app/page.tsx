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

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 transition-colors duration-200">
      <main className="container mx-auto px-4 py-16 md:py-24">
        <section className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            FastFast Logistics Services
          </h2>
          <p className="text-lg md:text-xl mb-8">
            Experience seamless shipping and tracking with FastFast Logistics
            Services
          </p>
          <p className="text-lg md:text-xl mb-8">
            Fast, Cheap, and Secure Logistics Solutions
          </p>

          <Link href="/booking" passHref>
            <Button
              size="lg"
              className="text-lg px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-200"
            >
              Get Started
            </Button>
          </Link>
        </section>

        <section className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          <Link href="/booking" passHref>
            <Card className="cursor-pointer bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-200">
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl">
                  Quick Booking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Schedule your shipments with ease using our intuitive booking
                  system.
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
          <Link href="/tracking" passHref>
            <Card className="cursor-pointer bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-200">
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl">
                  Real-time Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Stay informed with up-to-the-minute updates on your shipment’s
                  location.
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
          <Link href="/delivery" passHref>
            <Card className="cursor-pointer bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-200">
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl">
                  Secure Delivery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Rest easy knowing your packages are handled with care and
                  delivered safely.
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        </section>
      </main>
    </div>
  );
}
