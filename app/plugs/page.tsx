import {
  ArrowRight,
  UtensilsCrossed,
  Car,
  Users,
  Building2,
  Briefcase,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  const directories = [
    {
      href: "/plugs/food-vendors",
      label: "Food Vendor Directory",
      description:
        "Discover local restaurants, food trucks, and catering services",
      icon: UtensilsCrossed,
      color: "from-orange-500 to-red-500",
    },
    {
      href: "/plugs/carpooling-directory",
      label: "Carpooling Directory",
      description: "Connect with neighbors for sustainable commuting solutions",
      icon: Car,
      color: "from-green-500 to-emerald-600",
    },
    {
      href: "/plugs/community-events",
      label: "Community Events",
      description: "Stay updated with local gatherings and activities",
      icon: Users,
      color: "from-blue-500 to-indigo-600",
    },
    {
      href: "/plugs/local-services",
      label: "Local Services",
      description: "Find trusted professionals in your neighborhood",
      icon: Building2,
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-neutral-900 dark:to-neutral-800">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            SurePlug Community Hub
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Your gateway to local services, events, and community connections
          </p>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {directories.map((directory) => (
            <Link href={directory.href} key={directory.href}>
              <div className="group p-6 bg-white dark:bg-neutral-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-neutral-700 hover:border-indigo-500 dark:hover:border-indigo-500">
                <div className="flex items-start space-x-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-r ${directory.color} text-white`}
                  >
                    <directory.icon size={24} />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                      {directory.label}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {directory.description}
                    </p>
                    <div className="flex items-center text-indigo-600 dark:text-indigo-400 font-medium">
                      <span>Explore</span>
                      <ArrowRight
                        size={16}
                        className="ml-2 group-hover:translate-x-2 transition-transform"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl flex items-center space-x-2 transition-colors">
            <Briefcase size={20} />
            <span>Post a Service</span>
          </button>
          <button className="px-6 py-3 bg-white dark:bg-neutral-800 text-indigo-600 dark:text-indigo-400 border border-indigo-600 dark:border-indigo-400 rounded-xl flex items-center space-x-2 hover:bg-indigo-50 dark:hover:bg-neutral-700 transition-colors">
            <MessageCircle size={20} />
            <span>Contact Support</span>
          </button>
        </div>
      </div>
    </div>
  );
}
