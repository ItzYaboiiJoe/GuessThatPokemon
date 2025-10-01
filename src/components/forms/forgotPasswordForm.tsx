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

// Define the form schema
const formSchema = z.object({
  email: z.email("Invalid email address"),
});

const ForgotPasswordForm = () => {
  // States to handle request messages
  const [requestError, setRequestError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: { email: "" },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Reset messages
    setRequestError(null);
    setSuccessMessage(null);

    // Send password reset email using Supabase
    const { error } = await supabase.auth.resetPasswordForEmail(values.email);

    // Handle any errors and display them on the page
    if (error) {
      setRequestError(error.message);
    } else {
      setSuccessMessage("Password reset email sent! Please check your inbox.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Email Address"
                  className="mt-4 text-center rounded-xl"
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
          <p className="mt-4 text-center text-red-600 font-semibold">
            {requestError}
          </p>
        )}

        {/* Success Message */}
        {successMessage && (
          <p className="mt-4 text-center text-green-600 font-semibold">
            {successMessage}
          </p>
        )}
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
