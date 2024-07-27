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
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <main className="container mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <h2 className="text-5xl font-extrabold text-gray-900 mb-4">
            Fastfast Logistics Services
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Experience seamless shipping and tracking with FastFast Logistics
            Services
          </p>
          <p className="text-x1 text-green-600 mb-8">
            {" "}
            Fast, Reliable Logistics Solutions
          </p>

          <Link href="/booking" passHref>
            <Button size="lg" className="text-lg px-8 py-4">
              Get Started
            </Button>
          </Link>
        </section>

        <section className="grid md:grid-cols-3 gap-8">
          <Link href="/booking" passHref>
            <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle>Quick Booking</CardTitle>
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
            <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle>Real-time Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Stay informed with up-to-the-minute updates on your shipment's
                  location.
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
          <Link href="/delivery" passHref>
            <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle>Secure Delivery</CardTitle>
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
