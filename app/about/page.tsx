import AboutUsContent from "@/components/AboutUs";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-lg shadow-lg  flex items-center justify-center">
      <div className="container mx-auto px-4 py-12 lg:py-16 text-center">
        <h1 className="text-3xl lg:text-4xl font-bold mb-8">
          About FastFast Logistics
        </h1>
        <AboutUsContent />
      </div>
    </div>
  );
}
