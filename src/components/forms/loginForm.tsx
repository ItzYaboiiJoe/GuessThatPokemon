"use client";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

// Define the form schema
const formSchema = z.object({
  email: z.email(),
  password: z.string(),
});

const LoginForm = () => {
  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(formSchema),
  });

  // Handle form submission
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
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
      </form>
    </Form>
  );
};

export default LoginForm;
