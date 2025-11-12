"use client";

import Image from "next/image";
import Link from "next/link";
import LoginForm from "@/components/forms/loginForm";
import { motion } from "motion/react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          scale: { type: "spring", duration: 0.5, bounce: 0.5 },
        }}
      >
        <div className="bg-white rounded-3xl shadow-2xl p-8 responsePhones text-center">
          {/* Pokeball Image */}
          <div className="flex justify-center mb-4">
            <Image src="/pokeball.png" alt="Pokeball" width={60} height={60} />
          </div>

          {/* Title */}
          <h1 className="text-2xl lg:text-3xl font-extrabold mb-6 text-gray-800 drop-shadow">
            Login to Continue
          </h1>

          {/* Login Form */}
          <LoginForm />

          {/* Auth Links */}
          <div className="mt-6 border-t border-gray-200 pt-4 text-sm text-gray-600 space-y-2">
            <p>
              Forgot your password?{" "}
              <Link
                href="/forgot-password"
                className="text-blue-600 font-semibold hover:underline"
              >
                Reset
              </Link>
            </p>
            <p>
              Don’t have an account?{" "}
              <Link
                href="/register"
                className="text-blue-600 font-semibold hover:underline"
              >
                Register
              </Link>
            </p>
          </div>

          {/* Back to Menu */}
          <Link
            href="/"
            className="mt-6 inline-block text-gray-500 text-sm font-medium hover:text-gray-800 transition"
          >
            ← Back to Menu
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
