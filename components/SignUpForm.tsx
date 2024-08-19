// File: components/SignUpForm.js
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function SignUpForm() {
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        // Sign in the user after successful signup
        await signIn("credentials", { email, password, callbackUrl: "/" });
      } else {
        const data = await response.json();
        setError(data.message || "An error occurred during signup");
      }
    } catch (error) {
      setError("An error occurred during signup");
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 space-y-6 bg-white dark:bg-gray-900 shadow-md rounded-lg transition-colors duration-200">
      <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
        Create an Account
      </h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <label className="block">
            <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </span>
            <input
              name="name"
              type="text"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-gray-100"
              placeholder="John Doe"
            />
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </span>
            <input
              name="email"
              type="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-gray-100"
              placeholder="you@example.com"
            />
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </span>
            <input
              name="password"
              type="password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-gray-100"
              placeholder="••••••••"
            />
          </label>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 dark:bg-indigo-500 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign Up
        </button>
      </form>

      <div className="text-center text-sm">
        <Link
          href="/auth/signin"
          className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300"
        >
          Already have an account? Sign in
        </Link>
      </div>
    </div>
  );
}