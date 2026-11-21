import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TruckIcon, PackageCheck, MapPin, Wallet, Clock, ArrowRight } from "lucide-react";

const services = [
  { title: "Local Package Delivery", description: "Arrange delivery within Sapele, Warri, Asaba, Oghara and Koko, Delta State.", icon: TruckIcon, stats: "Five local service areas", accent: "from-blue-500 to-indigo-500" },
  { title: "Rider Pickup", description: "Request a rider to collect a package from your home, shop or business, subject to availability.", icon: PackageCheck, stats: "Pickup requests", accent: "from-indigo-500 to-purple-500" },
  { title: "Pay on Delivery", description: "Offer customers Pay on Delivery for local orders across all five main service areas.", icon: Wallet, stats: "Five confirmed POD areas", accent: "from-purple-500 to-pink-500" },
  { title: "Same-Day Options", description: "Ask about same-day delivery for your specific route and order; availability depends on operating conditions.", icon: Clock, stats: "Confirm when booking", accent: "from-pink-500 to-rose-500" },
];

export default function ServicesOverview() {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <Card key={service.title} className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-neutral-700 dark:bg-neutral-800">
            <div className={`absolute left-0 top-0 h-1 w-full bg-gradient-to-r ${service.accent}`} />
            <CardHeader className="pt-7">
              <div className="mb-2 inline-flex w-fit rounded-2xl bg-indigo-50 p-3 dark:bg-indigo-950/50">
                <service.icon className="h-6 w-6 text-indigo-600 dark:text-indigo-300" />
              </div>
              <CardTitle className="text-lg font-bold">{service.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="min-h-[76px] text-sm leading-6 text-neutral-600 dark:text-neutral-300">{service.description}</p>
              <div className="mt-5 flex items-center justify-between border-t pt-4 text-xs font-semibold text-neutral-500 dark:border-neutral-700 dark:text-neutral-400">
                <span>{service.stats}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
