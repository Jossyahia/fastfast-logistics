import ServicesOverview from "@/components/ServicesOverview";
import ServiceDetails from "@/components/ServiceDetails";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-12 min-h-screen bg-neutral-100 dark:bg-neutral-900 transition-colors duration-200">
      <h1 className="text-3xl lg:text-4xl font-bold mb-8 text-center">
        Our Services
      </h1>
      <div className="space-y-12">
        <ServicesOverview />
        <ServiceDetails />
      </div>
      <div className="mt-12 text-center">
        <Link href="/booking" passHref>
          <Button size="lg">Book a Service Now</Button>
        </Link>
      </div>
    </div>
  );
}
