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
  updateTime,
  updateCurrentTime,
  currentTime,
} from "../api/handleLeaderboard";
import { fetchPlayerInfo, updateDate } from "../api/fetch";
import Results from "../modal/results";
import { useState, useEffect, useRef } from "react";
import convertSeconds from "../tools/bestTimeConversion";

// Define the Pokemon Name Prop
type PokemonNameProp = {
  pokemonName: string;
  pokemonType: string;
  pokemonCry: string;
  pokemonHabitat: string;
  pokemonDescription: string;
  onCorrect: () => void;
  onSubmitChange?: (hasSubmitted: boolean) => void;
  stopwatchSeconds: number;
};

// Define the form schema
const formSchema = z.object({
  answer: z.string().min(1, "You must enter an answer"),
});

const AnswerForm = ({
  pokemonName,
  pokemonType,
  pokemonCry,
  pokemonHabitat,
  pokemonDescription,
  onCorrect,
  onSubmitChange,
  stopwatchSeconds,
}: PokemonNameProp) => {
  // State to store the checking leaderboard api
  const [checkUser, setCheckUser] = useState<LeaderboardEntry | null>(null);
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
  // State to manage pokemon habitat
  const [pokemonHabitatState, setPokemonHabitatState] = useState("");
  const [resultStatus, setResultStatus] = useState<
    "correct" | "wrong" | "results" | undefined
  >(undefined);
  // State to manage displaying Hints on incorrect
  const [firstHint, setFirstHint] = useState(false);
  const [secondHint, setSecondHint] = useState(false);
  // State to pass beat time to results modal
  const [winTime, setWinTime] = useState("");

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { answer: "" },
  });

  useEffect(() => {
    onSubmitChange?.(hasSubmitted);
  }, [hasSubmitted, onSubmitChange]);

  // Open the Modal
  const resultsButton = () => {
    setResultsOpen(true);
  };

  // Results Button Render Modal
  const postResultButton = async () => {
    if (mode === "auth" && checkUser) {
      // Fetch the Current Time it took to solve this pokemon
      const fetchTime = await currentTime(trainerName);
      if (fetchTime?.LatestSolvedTime === "DNF") {
        setWinTime("DNF");
      } else {
        const convertedTime = convertSeconds(fetchTime?.LatestSolvedTime);
        setWinTime(convertedTime);
      }
    }
    // Pass pokemon data to results view modal
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
    setPokemonHabitatState(" is found in " + pokemonHabitat + " habitats.");
    setResultStatus("results");
  };

  // Fetch Mode
  const mode = localStorage.getItem("Mode");
  // Fetch trainer name
  const trainerName = localStorage.getItem("TrainerName")!;
  // Fetch Trainer GUID
  const trainerID = localStorage.getItem("TrainerID")!;
  // Current Date
  const currentDate = new Date();
  const currentDateEastern = currentDate.toLocaleDateString("en-CA", {
    timeZone: "America/New_York",
  });

  // Yesterday Date for tracking daily login streak
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterdayEastern = yesterdayDate.toLocaleDateString("en-CA", {
    timeZone: "America/New_York",
  });

  // Call API to check if the user is a guest or an auth user to setup leaderboard stats update
  useEffect(() => {
    if (mode === "auth") {
      const loadData = async () => {
        const data = await checkLeaderboard(trainerName);
        if (data) setCheckUser(data);
      };
      loadData();
    }
  }, [trainerName, mode]);

  // Checking if the user exists or its a guest and fetch the current leaderboard score use has
  // Keep your leaderboard effect as-is
  useEffect(() => {
    if (checkUser) {
      setSolvedTrivia(checkUser.TriviaSolved);
      setFirstTryStreak(checkUser.WinningStreak);
    }
  }, [checkUser]);

  // New effect — runs after submissionDate actually loads
  useEffect(() => {
    if (!submissionDate) return;

    const currentDateEastern = new Date().toLocaleDateString("en-CA", {
      timeZone: "America/New_York",
    });

    if (submissionDate === currentDateEastern) {
      setHasSubmitted(true);
      onCorrect();
    }
  }, [submissionDate, onCorrect]);

  // Fetch the latest submission Date the user has
  useEffect(() => {
    if (mode === "auth" && trainerID) {
      const loadID = async () => {
        const lastSubmissionDate = await fetchPlayerInfo(trainerID);

        if (lastSubmissionDate && lastSubmissionDate.length > 0) {
          setSubmissionDate(lastSubmissionDate[0].SubmissionDate);
        }
      };

      loadID();
    }
  }, [trainerID, mode]);

  // Update stopwatch as long as has submit is not true
  useEffect(() => {
    if (!hasSubmitted && mode === "auth" && trainerID) {
      localStorage.setItem("time", stopwatchSeconds.toString());
    }
  }, [stopwatchSeconds, hasSubmitted, mode, trainerID]);

  const triesAttempt = useRef(0);
  let newDailyLoginStreak = checkUser?.DailyLoginStreak ?? 0;

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const correctAnswer = pokemonName.toLowerCase().trim();
    const userAnswer = values.answer.toLowerCase().trim();
    triesAttempt.current++;

    if (userAnswer === correctAnswer) {
      // Update Current Time
      await updateCurrentTime(stopwatchSeconds, trainerName);
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
      setPokemonHabitatState(" is found in " + pokemonHabitat + " habitats.");
      setResultStatus("correct");
      resultsButton();

      // check to update values if the player is an auth user
      if (mode === "auth" && checkUser) {
        // Update Daily Login Streak Data
        if (submissionDate === currentDateEastern) {
          newDailyLoginStreak = checkUser?.DailyLoginStreak;
        } else if (submissionDate === yesterdayEastern) {
          newDailyLoginStreak = checkUser?.DailyLoginStreak + 1;
        } else {
          newDailyLoginStreak = 1;
        }

        // Update Best Time
        if (checkUser.BestSolvedTime === null) {
          await updateTime(stopwatchSeconds, trainerName);
        } else if (stopwatchSeconds < checkUser.BestSolvedTime) {
          await updateTime(stopwatchSeconds, trainerName);
        }

        // Fetch the Current Time it took to solve this pokemon
        const fetchTime = await currentTime(trainerName);
        const convertedTime = convertSeconds(fetchTime?.LatestSolvedTime);
        setWinTime(convertedTime);

        const newSolved = solvedTrivia + 1;
        const newStreak = triesAttempt.current === 1 ? firstTryStreak + 1 : 0;

        // Update table and increment the solved value by 1 and win streak if the user got it first try
        // Update the Daily Login Streak Value
        await updateLeaderboard(
          newSolved,
          newStreak,
          trainerName,
          newDailyLoginStreak
        );

        // Update local state so next submit uses fresh values
        setSolvedTrivia(newSolved);
        setFirstTryStreak(newStreak);

        localStorage.removeItem("time");
      }

      // A flag to send to the game page to display the image after correct answer submitted
      onCorrect();
      // To disable the submit button
      setHasSubmitted(true);
      // Update user submissionDate on the database
      if (mode === "auth" && trainerID) {
        updateDate(currentDateEastern, trainerID);
      }
    } else {
      setResultTitle("That is incorrect, try again!");
      if (triesAttempt.current === 3) {
        setFirstHint(true);
        setResultDescription(pokemonType);
      } else if (triesAttempt.current === 4) {
        setSecondHint(true);
      } else if (triesAttempt.current === 6) {
        setWinTime("DNF");
        onCorrect();
        setHasSubmitted(true);
        setResultTitle("That is incorrect, better luck tomorrow");
        // Update user submissionDate on the database
        if (mode === "auth" && trainerID) {
          updateDate(currentDateEastern, trainerID);
          await updateCurrentTime("DNF", trainerName);
          newDailyLoginStreak = checkUser!.DailyLoginStreak + 1;
          localStorage.removeItem("time");
        }
      }
      setResultStatus("wrong");

      if (mode === "auth" && checkUser) {
        // Reset First try streak back to 0
        await updateLeaderboard(
          solvedTrivia,
          0,
          trainerName,
          newDailyLoginStreak!
        );
        setFirstTryStreak(0);
      }
      resultsButton();
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
                <FormMessage className="text-center text-lg" />
              </FormItem>
            )}
          />
          {/* Display Results or Submit Button based on submission date */}
          {!hasSubmitted ? (
            <Button
              disabled={hasSubmitted}
              type="submit"
              className="bg-yellow-500 text-black mt-5 rounded-full hover:bg-yellow-600 hover:cursor-pointer"
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
        pokemonHabitat={pokemonHabitatState}
        pokemonDescription={pokemonDescription}
        status={resultStatus}
        cry={pokemonCry}
        firstHint={firstHint}
        secondHint={secondHint}
        winTime={winTime}
      />
    </>
  );
};

export default AnswerForm;
