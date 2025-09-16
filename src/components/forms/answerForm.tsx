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
import {
  LeaderboardEntry,
  updateLeaderboard,
  checkLeaderboard,
} from "../api/handleLeaderboard";
import { useState, useEffect, useRef } from "react";

// Define the Pokemon Name Prop
type PokemonNameProp = {
  pokemonName: string;
  onCorrect: () => void;
};

// Define the form schema
const formSchema = z.object({
  answer: z.string().min(1, "You must enter an answer"),
});

const AnswerForm = ({ pokemonName, onCorrect }: PokemonNameProp) => {
  // State to store the checking leaderboard api
  const [checkUser, setCheckUser] = useState<LeaderboardEntry[] | null>(null);
  // State to manage leaderboard score
  const [solvedTrivia, setSolvedTrivia] = useState(0);
  const [firstTryStreak, setFirstTryStreak] = useState(0);

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { answer: "" },
  });

  // Fetch trainer name
  const trainerName = localStorage.getItem("TrainerName")!;

  // Call API to check if the user is a guest or an auth user to setup leaderboard stats update
  useEffect(() => {
    const loadData = async () => {
      const data = await checkLeaderboard(trainerName);
      if (data) setCheckUser(data);
    };
    loadData();
  }, [trainerName]);

  // Checking if the user exists or its a guest and fetch the current leaderboard score use has
  useEffect(() => {
    if (checkUser?.length === 0) {
      console.log("Its a guest user");
    } else if (checkUser?.length === 1) {
      setSolvedTrivia(checkUser?.[0].TriviaSolved);
      setFirstTryStreak(checkUser?.[0].WinningStreak);
    }
  }, [checkUser]);

  const triesAttempt = useRef(0);

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const correctAnswer = pokemonName.toLowerCase().trim();
    const userAnswer = values.answer.toLowerCase().trim();
    triesAttempt.current++;

    if (userAnswer === correctAnswer) {
      console.log("Correct Answer!");

      // check to update values if the player is an auth user
      if (checkUser?.length === 1) {
        const newSolved = solvedTrivia + 1;
        const newStreak = triesAttempt.current === 1 ? firstTryStreak + 1 : 0;

        // Update table and increment the solved value by 1 and win streak if the user got it first try
        await updateLeaderboard(newSolved, newStreak, trainerName);

        // Update local state so next submit uses fresh values
        setSolvedTrivia(newSolved);
        setFirstTryStreak(newStreak);
      }

      // A flag to send to the game page to display the image after correct answer submitted
      onCorrect();
    } else {
      console.log("Wrong Answer");
      if (checkUser?.length === 1) {
        // Reset First try streak back to 0
        await updateLeaderboard(solvedTrivia, 0, trainerName);
        setFirstTryStreak(0);
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center"
      >
        <FormField
          control={form.control}
          name="answer"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input className="mt-10" {...field} />
              </FormControl>
              <FormMessage className="text-center" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="bg-yellow-500 text-black mt-5 hover:bg-yellow-600 hover:cursor-pointer"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default AnswerForm;
