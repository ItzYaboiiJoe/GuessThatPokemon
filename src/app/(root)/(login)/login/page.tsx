"use client";

import Image from "next/image";
import Link from "next/link";
import LoginForm from "@/components/forms/loginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md text-center">
        {/* Pokeball Image */}
        <div className="flex justify-center mb-4">
          <Image src="/pokeball.png" alt="Pokeball" width={60} height={60} />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold mb-6 text-gray-800 drop-shadow">
          Login to Continue
        </h1>

        {/* Login Form */}
        <LoginForm />

        {/* Link to Register */}
        <p className="mt-6 text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="text-blue-600 font-bold hover:underline"
          >
            Register
          </Link>
        </p>

        {/* Back to Menu */}
        <Link
          href="/"
          className="mt-6 inline-block text-gray-500 text-sm font-medium hover:text-gray-800 transition"
        >
          ← Back to Menu
        </Link>
      </div>
    </div>
  );
}
