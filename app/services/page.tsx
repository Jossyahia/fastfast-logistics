import React from "react";
import ServicesOverview from "@/components/ServicesOverview";
import ServiceDetails from "@/components/ServiceDetails";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Package } from "lucide-react";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-950/30 dark:to-transparent py-20">
        <div className="absolute inset-0 bg-grid-neutral-900/[0.03] dark:bg-grid-neutral-100/[0.02]" />
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center p-2 bg-blue-50 dark:bg-blue-900/30 rounded-full mb-6">
              <Package className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                Premium Logistics Solutions
              </span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-400">
              Our Services
            </h1>

            <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-8 max-w-2xl mx-auto">
              Discover our comprehensive range of logistics and delivery
              services designed to meet your every need with precision and
              reliability.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 -mt-12">
        <div className="space-y-24">
          {/* Services Overview Section */}
          <section>
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                Service Highlights
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                Quick overview of our core services and capabilities
              </p>
            </div>
            <ServicesOverview />
          </section>

          {/* Service Details Section */}
          <section>
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                Detailed Services
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                In-depth information about our service offerings
              </p>
            </div>
            <ServiceDetails />
          </section>
        </div>

        {/* CTA Section */}
        <div className="py-24 text-center">
          <div className="max-w-xl mx-auto space-y-6">
            <h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
              Ready to Get Started?
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-8">
              Book your service now and experience seamless logistics solutions
              tailored to your needs.
            </p>
            <Link href="/booking" passHref>
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/20"
              >
                Book a Service Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
