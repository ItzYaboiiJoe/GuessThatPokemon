"use client";

import Image from "next/image";
import Link from "next/link";
import RegisterForm from "@/components/shared/registerForm";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md text-center">
        {/* Pokeball Image */}
        <div className="flex justify-center mb-4">
          <Image src="/pokeball.png" alt="Pokeball" width={60} height={60} />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold mb-6 text-gray-800 drop-shadow">
          Create Your Trainer Account
        </h1>

        {/* Registration Form */}
        <RegisterForm />

        {/* Already have account */}
        <p className="mt-6 text-sm text-gray-600">
          Already a trainer?{" "}
          <Link
            href="/login"
            className="text-blue-600 font-bold hover:underline"
          >
            Login
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
