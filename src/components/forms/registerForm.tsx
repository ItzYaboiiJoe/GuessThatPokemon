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
import RegistrationConfirmation from "../modal/registerConfirmation";

// Define the form schema
const formSchema = z.object({
  trainerName: z
    .string()
    .nonempty("You must enter your trainer name")
    .min(3, "Trainer name must be at least 3 characters"),
  email: z.email("Invalid email address"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const RegisterForm = () => {
  // State to handle registration errors
  const [registerError, setregisterError] = useState<string | null>(null);
  // State to control the registration confirmation modal
  const [registerConfirmationOpen, setRegisterConfirmationOpen] =
    useState(false);
  // State to control passing user email to the confirmation modal
  const [registeredEmail, setRegisteredEmail] = useState("");
  // State to control passing trainer name to the confirmation modal
  const [registeredTrainerName, setRegisteredTrainerName] = useState("");

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: { trainerName: "", email: "", password: "" },
    resolver: zodResolver(formSchema),
  });

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Sign up the user with Supabase
    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          trainer_name: values.trainerName,
        },
      },
    });

    // Feedback to the user
    if (!error) {
      setRegisterConfirmationOpen(true);
      setRegisteredEmail(values.email);
      setRegisteredTrainerName(values.trainerName);
    } else {
      setregisterError(error.message);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Trainer Name Input */}
          <FormField
            control={form.control}
            name="trainerName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Trainer Name"
                    className="text-center rounded-xl"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-center" />
              </FormItem>
            )}
          />

          {/* Email Address Input */}
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

          {/* Password Input */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Password"
                    className="mt-4 text-center rounded-xl"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-center" />
              </FormItem>
            )}
          />

          {/* Register Button */}
          <Button
            type="submit"
            className="mt-6 w-full bg-yellow-400 text-black font-bold text-lg py-6 rounded-xl shadow-2xl hover:bg-yellow-300 hover:cursor-pointer"
          >
            Register
          </Button>

          {/* Error Message if there were registration problems */}
          {registerError && (
            <p className="mt-4 text-center text-red-600 font-semibold">
              {registerError}
            </p>
          )}
        </form>
      </Form>
      <RegistrationConfirmation
        open={registerConfirmationOpen}
        setOpen={setRegisterConfirmationOpen}
        email={registeredEmail}
        trainerName={registeredTrainerName}
      />
    </>
  );
};

export default RegisterForm;
