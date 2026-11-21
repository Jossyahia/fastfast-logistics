import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TruckIcon,
  GlobeIcon,
  ClockIcon,
  ShieldCheckIcon,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    title: "Express Delivery",
    description: "Same-day and next-day delivery options for urgent shipments.",
    icon: TruckIcon,
    stats: "24/7 Service",
    accent: "from-blue-500 to-indigo-500",
  },
  {
    title: "International Shipping",
    description: "Reliable worldwide shipping with customs handling.",
    icon: GlobeIcon,
    stats: "200+ Countries",
    accent: "from-indigo-500 to-purple-500",
  },
  {
    title: "Time-Critical Logistics",
    description: "Specialized solutions for time-sensitive deliveries.",
    icon: ClockIcon,
    stats: "99.9% On-time",
    accent: "from-purple-500 to-pink-500",
  },
  {
    title: "Secure Transport",
    description: "Enhanced security measures for high-value items.",
    icon: ShieldCheckIcon,
    stats: "100% Protected",
    accent: "from-pink-500 to-rose-500",
  },
];

export default function ServicesOverview() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <Card
            key={index}
            className="group relative overflow-hidden border-0 bg-white dark:bg-neutral-800 hover:shadow-xl transition-all duration-300"
          >
            {/* Gradient accent line */}
            <div
              className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${service.accent}`}
            />

            <CardHeader className="pt-8">
              <div className="mb-4">
                <div className="p-3 inline-flex rounded-xl bg-gradient-to-r from-neutral-100 to-neutral-200 dark:from-neutral-700 dark:to-neutral-800">
                  <service.icon className="h-6 w-6 text-neutral-700 dark:text-neutral-200" />
                </div>
              </div>
              <CardTitle className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                {service.title}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                {service.description}
              </p>

              <div className="flex items-center justify-between mt-6">
                <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                  {service.stats}
                </span>

                <button className="group-hover:bg-neutral-100 dark:group-hover:bg-neutral-700 p-2 rounded-full transition-colors duration-300">
                  <ArrowRight className="h-4 w-4 text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors duration-300" />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
