// /app/page.tsx

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border-2 border-transparent hover:border-indigo-500">
      <div className="container mx-auto p-8 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-lg rounded-2xl shadow-2xl">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
          Welcome to Our Sure Plug Directories
        </h1>
        <nav>
          <ul className="space-y-4">
            {[
              {
                href: "/food-vendors",
                label: "Food Vendor Directory",
              },
              { href: "/carpooling-directory", label: "Carpooling Directory" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block w-full p-4 bg-white dark:bg-neutral-700 rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-200 border-2 border-transparent hover:border-indigo-500 text-center font-semibold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
