"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        if (data.user.role === "RIDER") {
          router.push("/rider/dashboard");
        } else {
          router.push("/");
        }
      } else {
        const data = await response.json();
        setError(data.message || "An error occurred during login");
      }
    } catch (error) {
      setError("An error occurred during login");
    }
  };

  const handleGoogleSignIn = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="max-w-md mx-auto p-8 space-y-6 bg-white dark:bg-gray-900 shadow-md rounded-lg transition-colors duration-200">
      <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
        Log In
      </h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
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
          Log In
        </button>
      </form>

      <div className="flex items-center justify-center space-x-2 mt-4">
        <hr className="w-1/3 border-gray-300 dark:border-gray-700" />
        <span className="text-gray-500 dark:text-gray-400 text-sm">or</span>
        <hr className="w-1/3 border-gray-300 dark:border-gray-700" />
      </div>

      <button
        onClick={handleGoogleSignIn}
        className="w-full mt-4 py-2 px-4 bg-red-600 dark:bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-700 dark:hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        Sign in with Google
      </button>

      <div className="text-center text-sm mt-4">
        <Link
          href="/auth/signup"
          className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300"
        >
          Don't have an account? Sign up
        </Link>
      </div>
    </div>
  );
}
