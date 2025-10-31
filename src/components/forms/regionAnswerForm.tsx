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
import Results from "../modal/results";

// Define the Pokemon Name Prop
type PokemonNameProp = {
  pokemonName: string;
  pokemonType: string;
  pokemonCry: string;
  pokemonHabitat: string;
  pokemonDescription: string;
  onCorrect: () => void;
  onSubmitChange?: (hasSubmitted: boolean) => void;
};

// Define the form schema
const formSchema = z.object({
  answer: z.string().min(1, "You must enter an answer"),
});

const RegionAnswerForm = () => {
  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { answer: "" },
  });

  return (
    <>
      <Form {...form}>
        <form className="flex flex-col items-center">
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    // disabled={hasSubmitted}
                    onPaste={(e) => e.preventDefault()}
                    className="mt-10"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-center text-base lg:text-lg" />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </>
  );
};

export default RegionAnswerForm;
