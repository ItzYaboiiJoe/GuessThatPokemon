"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import ChangePasswordForm from "@/components/forms/changePasswordForm";

const ChangePassword = () => {
  // State to handle loading state
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  // Check if there is an auth session and redirect to login if not
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    };

    checkSession();
  }, [router]);

  // Show loading state while fetching Trainer Name
  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Image
          src="/pokeball.png"
          alt="Pokeball Rotating"
          width={300}
          height={300}
          priority
          className="animate-spin"
        />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="bg-white rounded-3xl shadow-2xl p-8 responsePhones text-center">
        {/* Pokeball Image */}
        <div className="flex justify-center mb-4">
          <Image src="/pokeball.png" alt="Pokeball" width={60} height={60} />
        </div>

        {/* Title */}
        <h1 className="text-2xl lg:text-3xl font-extrabold mb-6 text-gray-800 drop-shadow">
          Change Password
        </h1>

        {/* Change Password Form */}
        <ChangePasswordForm />

        {/* Back to Menu */}
        <Link
          href="/menu"
          className="mt-6 inline-block text-gray-500 text-sm font-medium hover:text-gray-800 transition"
        >
          ← Back to Menu
        </Link>
      </div>
    </div>
  );
};

export default ChangePassword;
