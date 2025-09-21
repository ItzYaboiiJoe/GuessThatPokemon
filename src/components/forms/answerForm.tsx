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
import { fetchPlayerInfo, updateDate } from "../api/fetch";
import Results from "../modal/results";
import { useState, useEffect, useRef } from "react";

// Define the Pokemon Name Prop
type PokemonNameProp = {
  pokemonName: string;
  pokemonType: string;
  pokemonCry: string;
  onCorrect: () => void;
};

// Define the form schema
const formSchema = z.object({
  answer: z.string().min(1, "You must enter an answer"),
});

const AnswerForm = ({
  pokemonName,
  pokemonType,
  pokemonCry,
  onCorrect,
}: PokemonNameProp) => {
  // State to store the checking leaderboard api
  const [checkUser, setCheckUser] = useState<LeaderboardEntry[] | null>(null);
  // State to manage leaderboard score
  const [solvedTrivia, setSolvedTrivia] = useState(0);
  const [firstTryStreak, setFirstTryStreak] = useState(0);
  // State to store submission to prevent multiple submission
  const [submissionDate, setSubmissionDate] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  // State to handle results modal visibility
  const [resultsOpen, setResultsOpen] = useState(false);
  // State for passing results to modal
  const [resultTitle, setResultTitle] = useState("");
  const [resultDescription, setResultDescription] = useState("");
  const [resultStatus, setResultStatus] = useState<
    "correct" | "wrong" | "results" | undefined
  >(undefined);
  // State to manage displaying Hints on incorrect
  const [firstHint, setFirstHint] = useState(false);
  const [secondHint, setSecondHint] = useState(false);

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { answer: "" },
  });

  // Open the Modal
  const resultsButton = () => {
    setResultsOpen(true);
  };

  // Results Button Render Modal
  const postResultButton = () => {
    setResultsOpen(true);
    setResultTitle(pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1));
    setFirstHint(false);
    setSecondHint(false);
    setResultDescription(
      pokemonName.charAt(0).toUpperCase() +
        pokemonName.slice(1) +
        " is a " +
        pokemonType +
        " type pokemon"
    );
    setResultStatus("results");
  };

  // Fetch trainer name
  const trainerName = localStorage.getItem("TrainerName")!;
  // Fetch Trainer GUID
  const trainerID = localStorage.getItem("TrainerID")!;
  // Current Date
  const currentDate = new Date();
  const currentDateEastern = currentDate.toLocaleDateString("en-CA", {
    timeZone: "America/New_York",
  });

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
    if (checkUser?.length === 1) {
      setSolvedTrivia(checkUser?.[0].TriviaSolved);
      setFirstTryStreak(checkUser?.[0].WinningStreak);
      // Disable Submit button if the user submitted already current day
      if (submissionDate === currentDateEastern) {
        setHasSubmitted(true);
        onCorrect();
      }
    }
  }, [checkUser, submissionDate, currentDateEastern, onCorrect]);

  // Fetch the latest submission Date the user has
  useEffect(() => {
    const loadID = async () => {
      const lastSubmissionDate = await fetchPlayerInfo(trainerID);
      setSubmissionDate(lastSubmissionDate![0].SubmissionDate);
    };
    loadID();
  }, [trainerID]);

  const triesAttempt = useRef(0);

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const correctAnswer = pokemonName.toLowerCase().trim();
    const userAnswer = values.answer.toLowerCase().trim();
    triesAttempt.current++;

    if (userAnswer === correctAnswer) {
      setResultTitle("Correct");
      setFirstHint(false);
      setSecondHint(false);
      setResultDescription(
        pokemonName.charAt(0).toUpperCase() +
          pokemonName.slice(1) +
          " is a " +
          pokemonType +
          " type pokemon"
      );
      setResultStatus("correct");
      resultsButton();

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
      // To disable the submit button
      setHasSubmitted(true);
      // Update user submissionDate on the database
      updateDate(currentDate, trainerID);
    } else {
      resultsButton();
      setResultTitle("That is incorrect, try again!");
      if (triesAttempt.current === 3) {
        setFirstHint(true);
        setResultDescription(pokemonType);
      } else if (triesAttempt.current === 5) {
        setSecondHint(true);
      }
      setResultStatus("wrong");
      if (checkUser?.length === 1) {
        // Reset First try streak back to 0
        await updateLeaderboard(solvedTrivia, 0, trainerName);
        setFirstTryStreak(0);
      }
    }
  };

  return (
    <>
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
                  <Input disabled={hasSubmitted} className="mt-10" {...field} />
                </FormControl>
                <FormMessage className="text-center" />
              </FormItem>
            )}
          />
          {/* Display Results or Submit Button based on submission date */}
          {!hasSubmitted ? (
            <Button
              disabled={hasSubmitted}
              type="submit"
              className="bg-yellow-500 text-black mt-5 hover:bg-yellow-600 hover:cursor-pointer"
            >
              Submit
            </Button>
          ) : (
            <Button
              type="button"
              onClick={postResultButton}
              className="bg-yellow-500 text-black mt-5 hover:bg-yellow-600 hover:cursor-pointer"
            >
              Results
            </Button>
          )}
        </form>
      </Form>
      <Results
        open={resultsOpen}
        setOpen={setResultsOpen}
        title={resultTitle}
        description={resultDescription}
        status={resultStatus}
        cry={pokemonCry}
        firstHint={firstHint}
        secondHint={secondHint}
      />
    </>
  );
};

export default AnswerForm;
