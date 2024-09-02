"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation"; // Updated import
import Link from "next/link";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter(); // Using useRouter from next/navigation

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
    } else if (res?.ok) {
      router.push("/rider/dashboard"); // Redirect to homepage on successful login
    }
  };

  const handleGoogleSignIn = async () => {
    signIn("google");
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-200">
        Sign In
      </h1>
      <form onSubmit={handleSubmit} className="mt-6">
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <div className="space-y-4">
          <label className="block">
            <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </span>
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-gray-100"
              placeholder="••••••••"
            />
          </label>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 mt-6 bg-indigo-600 dark:bg-indigo-500 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
        className="w-full py-2 px-4 bg-red-600 dark:bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-700 dark:hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mt-4"
      >
        Sign in with Google
      </button>

      <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
        Don't have an account?{" "}
        <Link
          href="/auth/signup"
          className="text-indigo-600 dark:text-indigo-400"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
