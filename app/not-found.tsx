// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen items-center justify-center bg-neutral-100 dark:bg-neutral-900 transition-colors duration-200">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="mt-4 text-xl text-gray-600">Page Not Found</p>
        <p className="mt-2 text-gray-500">
          Sorry, we couldn't find the page you're looking for.
        </p>

        <Link
          href="/"
          className="mt-6 inline-block px-6 py-3 text-sm font-semibold text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
}
