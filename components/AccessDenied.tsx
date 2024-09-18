// components/AccessDenied.tsx

import React from "react";
import Link from "next/link";

const AccessDenied: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <div className="mb-4">
          <svg
            className="mx-auto h-16 w-16 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h2>
        <p className="text-gray-600 mb-8">
          Sorry, you don&apos;t have permission to access this page.
        </p>
        <div className="flex flex-col gap-4">
          <Link
            href="/"
            className="inline-block bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Go Back Home
          </Link>
          <Link
            href="/profile"
            className="inline-block bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Go Back Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccessDenied;
