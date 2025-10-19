"use client";

import Image from "next/image";
import Link from "next/link";
import ForgotPasswordForm from "@/components/forms/forgotPasswordForm";

const ForgotPassword = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="bg-white rounded-3xl shadow-2xl p-8 responsePhones text-center">
        {/* Pokeball Image */}
        <div className="flex justify-center mb-4">
          <Image src="/pokeball.png" alt="Pokeball" width={60} height={60} />
        </div>

        {/* Title */}
        <h1 className="text-2xl iphoneMax:text-3xl font-extrabold mb-6 text-gray-800 drop-shadow">
          Forgot Password
        </h1>

        {/* Forgot Password Form */}
        <ForgotPasswordForm />

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
};

export default ForgotPassword;
