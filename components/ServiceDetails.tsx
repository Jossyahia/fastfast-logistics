import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Truck, Package, Globe, Clock, Shield, Warehouse } from "lucide-react";

const serviceDetails = [
  {
    title: "Express Delivery",
    icon: Truck,
    content:
      "Our Express Delivery service ensures your packages reach their destination in record time. Choose from same-day delivery for local shipments or next-day delivery for longer distances. Perfect for urgent documents, time-sensitive materials, or last-minute gifts.",
    highlight: "Same-day & next-day options available",
  },
  {
    title: "Affordable Delivery",
    icon: Package,
    content:
      "Our Express Delivery service ensures your packages reach their destination in record time. Choose from same-day delivery for local shipments or next-day delivery for longer distances. Perfect for urgent documents, time-sensitive materials, or last-minute gifts.",
    highlight: "Cost-effective shipping solutions",
  },
  {
    title: "International Shipping",
    icon: Globe,
    content:
      "With our International Shipping service, we handle all aspects of global logistics. From customs documentation to tracking, we ensure your shipments cross borders smoothly. We offer air freight for speed and sea freight for cost-effective bulk shipping.",
    highlight: "Global reach, local expertise",
  },
  {
    title: "Time-Critical Logistics",
    icon: Clock,
    content:
      "When every minute counts, our Time-Critical Logistics service delivers. We offer tailored solutions for industries like healthcare, manufacturing, and event management. Our dedicated team works around the clock to meet your most demanding deadlines.",
    highlight: "24/7 dedicated support",
  },
  {
    title: "Secure Transport",
    icon: Shield,
    content:
      "For high-value or sensitive items, our Secure Transport service provides peace of mind. We use advanced tracking technology, secure vehicles, and trained personnel to ensure your valuable shipments are protected throughout their journey.",
    highlight: "Advanced security measures",
  },
  {
    title: "Warehousing and Distribution",
    icon: Warehouse,
    content:
      "Our Warehousing and Distribution service offers flexible storage solutions and efficient distribution networks. We help optimize your supply chain with strategic inventory management, pick and pack services, and timely order fulfillment.",
    highlight: "Comprehensive logistics solutions",
  },
];

export default function ServiceDetails() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {serviceDetails.map((service, index) => (
          <Card
            key={index}
            className="overflow-hidden bg-white dark:bg-neutral-800 hover:shadow-lg transition-all duration-300 border border-neutral-200 dark:border-neutral-700"
          >
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value={`item-${index}`} className="border-none">
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors duration-200">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                      <service.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-lg text-neutral-900 dark:text-neutral-100">
                        {service.title}
                      </h3>
                      <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                        {service.highlight}
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <div className="pt-2 text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {service.content}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>
        ))}
      </div>
    </div>
  );
}
