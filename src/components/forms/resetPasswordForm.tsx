"use client";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Define the form schema
const formSchema = z.object({
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().nonempty("Please confirm your password"),
});

const ResetPasswordForm = () => {
  // States to handle request messages
  const [requestError, setRequestError] = useState<string | null>(null);

  const router = useRouter();

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: { password: "", confirmPassword: "" },
    resolver: zodResolver(formSchema),
  });

  // Clean up local storage and sign out session on exit
  const cleanUp = async () => {
    await supabase.auth.signOut();

    localStorage.removeItem("Mode");
    localStorage.removeItem("TrainerName");
    localStorage.removeItem("TrainerID");
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Reset messages
    setRequestError(null);

    const password = values.password;
    const confirmPassword = values.confirmPassword;

    if (password !== confirmPassword) {
      form.setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      form.setError("password", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }

    const { error } = await supabase.auth.updateUser({ password: password });

    // Handle any errors and display them on the page
    if (error) {
      setRequestError(error.message);
    } else {
      cleanUp();
      toast.success(
        "Password has been reset successfully! Routing to login..."
      );
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Password Input */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter New Password"
                  className="mt-4 text-sm text-center rounded-xl"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-center" />
            </FormItem>
          )}
        />

        {/* Confirm Password Input */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm New Password"
                  className="mt-4 text-sm text-center rounded-xl"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-center" />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          className="mt-6 w-full bg-blue-600 text-white font-bold text-lg py-6 rounded-xl shadow-2xl hover:bg-blue-500 hover:cursor-pointer"
        >
          Submit
        </Button>

        {/* Error Message if there were registration problems */}
        {requestError && (
          <p className="mt-4 text-sm lg:text-base text-center text-red-600 font-semibold">
            {requestError}
          </p>
        )}
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
