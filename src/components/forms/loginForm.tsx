"use client";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Define the form schema
const formSchema = z.object({
  email: z.email(),
  password: z.string(),
});

const LoginForm = () => {
  // State to handle login errors
  const [errorLogin, setErrorLogin] = useState<string | null>(null);

  const router = useRouter();

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(formSchema),
  });

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Sign in the user with Supabase
    const { data: loginUser, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    // Feedback to the user
    if (!error) {
      // Check if the user exists in table and insert into the table if doesn't, this way the table will only have users that have logged in at least once and verified their email
      const { data: Pokemon_Players } = await supabase
        .from("Pokemon_Players")
        .select("*")
        .eq("TrainerID", loginUser.user.id);

      if (Pokemon_Players?.length === 0) {
        const {} = await supabase.from("Pokemon_Players").insert([
          {
            TrainerName: loginUser.user.user_metadata.trainer_name,
            TrainerID: loginUser.user.id,
          },
        ]);

        // Create an empty entry in the leaderboard table for the new user
        const { error: leaderboardError } = await supabase
          .from("Pokemon_Leaderboard")
          .insert({
            TrainerName: loginUser.user.user_metadata.trainer_name,
            TriviaSolved: 0,
            WinningStreak: 0,
          });

        if (leaderboardError) {
          setErrorLogin(leaderboardError.message);
        }
      }

      // Redirect to the main menu
      router.push("/menu");
    } else {
      setErrorLogin(error.message);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Email Input */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Email Address"
                  className="mb-4 text-center rounded-xl"
                  {...field}
                />
              </FormControl>
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
                  className="mb-6 text-center rounded-xl"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Login Button */}
        <Button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold text-lg py-6 rounded-xl hover:bg-blue-500 hover:cursor-pointer"
        >
          Login
        </Button>

        {/* Error Message if there were login problems */}
        {errorLogin && (
          <p className="mt-4 text-center text-red-600 font-semibold">
            {errorLogin}
          </p>
        )}
      </form>
    </Form>
  );
};

export default LoginForm;
