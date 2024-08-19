// src/components/features/services/ServicesOverview.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TruckIcon, GlobeIcon, ClockIcon, ShieldCheckIcon } from "lucide-react";

const services = [
  {
    title: "Express Delivery",
    description: "Same-day and next-day delivery options for urgent shipments.",
    icon: TruckIcon,
  },
  {
    title: "International Shipping",
    description: "Reliable worldwide shipping with customs handling.",
    icon: GlobeIcon,
  },
  {
    title: "Time-Critical Logistics",
    description: "Specialized solutions for time-sensitive deliveries.",
    icon: ClockIcon,
  },
  {
    title: "Secure Transport",
    description: "Enhanced security measures for high-value items.",
    icon: ShieldCheckIcon,
  },
];

export default function ServicesOverview() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 bg-neutral-100 dark:bg-neutral-900 transition-colors duration-200">
      {services.map((service, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <service.icon className="h-6 w-6 mr-2 text-blue-600" />
              {service.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{service.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
