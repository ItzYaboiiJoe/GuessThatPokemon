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
import { useState, useEffect, useRef } from "react";
import { regionFetchPlayerInfo, updateRegionDate } from "../api/regionFetch";

// Define the Pokemon Name Prop
type PokemonNameProp = {
  pokemonName: string;
  pokemonType: string;
  pokemonCry: string;
  pokemonHabitat: string;
  pokemonDescription: string;
  pokemonRegion: string;
  onCorrect: () => void;
};

// Define the form schema
const formSchema = z.object({
  answer: z.string().min(1, "You must enter an answer"),
});

const RegionAnswerForm = ({
  pokemonName,
  pokemonType,
  pokemonCry,
  pokemonHabitat,
  pokemonDescription,
  pokemonRegion,
  onCorrect,
}: PokemonNameProp) => {
  // State to track if the form has been submitted
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [submissionDate, setSubmissionDate] = useState<string | null>(null);
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
  const [thirdHint, setThirdHint] = useState(false);

  // State to pass beat time to results modal
  const [winTime, setWinTime] = useState("");

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
  const postResultButton = async () => {
    // Pass pokemon data to results view modal
    setResultsOpen(true);
    setResultTitle(pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1));
    setFirstHint(false);
    setSecondHint(false);
    setThirdHint(false);
    setResultDescription(
      pokemonName.charAt(0).toUpperCase() +
        pokemonName.slice(1) +
        " is a " +
        pokemonType +
        " type pokemon"
    );
    setPokemonHabitatState(" is found in " + pokemonHabitat + " habitats.");
    setWinTime("");
    setResultStatus("results");
  };

  // Fetch trainer name
  const trainerID = localStorage.getItem("TrainerID")!;
  // Current Date
  const currentDate = new Date();
  const currentDateEastern = currentDate.toLocaleDateString("en-CA", {
    timeZone: "America/New_York",
  });

  const triesAttempt = useRef(0);
  const attemptsLeft = useRef(5);

  // Fetch the latest submission Date the user has
  useEffect(() => {
    const loadID = async () => {
      const lastSubmissionDate = await regionFetchPlayerInfo(trainerID);

      if (lastSubmissionDate && lastSubmissionDate.length > 0) {
        setSubmissionDate(lastSubmissionDate[0].RegionSubmissionDate);
      }
    };

    loadID();
  }, [trainerID]);

  // If User already submitted today, disable form

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

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const correctAnswer = pokemonName.toLowerCase().trim();
    const userAnswer = values.answer.toLowerCase().trim();
    triesAttempt.current++;
    attemptsLeft.current--;

    if (userAnswer === correctAnswer) {
      setResultTitle("Correct");
      setFirstHint(false);
      setSecondHint(false);
      setThirdHint(false);
      setResultDescription(
        pokemonName.charAt(0).toUpperCase() +
          pokemonName.slice(1) +
          " is a " +
          pokemonType +
          " type pokemon"
      );
      setPokemonHabitatState(" is found in " + pokemonHabitat + " habitats.");
      setResultStatus("correct");
      setWinTime("");
      resultsButton();

      // A flag to send to the game page to display the image after correct answer submitted
      onCorrect();
      // To disable the submit button
      setHasSubmitted(true);
      // Update Submission Date
      updateRegionDate(currentDateEastern, trainerID);
    } else {
      setResultTitle("That is incorrect, try again!");
      if (triesAttempt.current === 2) {
        setFirstHint(true);
        setResultDescription(pokemonType);
      } else if (triesAttempt.current === 3) {
        setSecondHint(true);
      } else if (triesAttempt.current === 4) {
        setThirdHint(true);
      } else if (triesAttempt.current === 5) {
        setWinTime("");
        onCorrect();
        setHasSubmitted(true);
        setResultTitle("That is incorrect, better luck tomorrow");
        updateRegionDate(currentDateEastern, trainerID);
      }
      setResultStatus("wrong");
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
                  <Input
                    disabled={hasSubmitted}
                    onPaste={(e) => e.preventDefault()}
                    className="mt-10"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-center text-base lg:text-lg" />
              </FormItem>
            )}
          />
          {/* Display Results or Submit Button based on submission date */}
          {!hasSubmitted ? (
            <Button
              disabled={hasSubmitted}
              type="submit"
              className="bg-yellow-500 text-black mt-5 w-32 rounded-full hover:bg-yellow-600 hover:cursor-pointer"
            >
              Submit
            </Button>
          ) : (
            <Button
              type="button"
              onClick={postResultButton}
              className="bg-yellow-500 text-black mt-5 w-32 rounded-full hover:bg-yellow-600 hover:cursor-pointer"
            >
              Results
            </Button>
          )}
        </form>
      </Form>

      {/* Attempts Left Section */}
      {!hasSubmitted && (
        <h1
          className="
    mt-6 text-lg md:text-xl font-extrabold tracking-wide
    text-transparent bg-clip-text 
    bg-gradient-to-r from-purple-200 via-pink-300 to-purple-200
    drop-shadow-[0_0_16px_rgba(255,180,255,0.95)]
    animate-[pulseSoft_3s_ease-in-out_infinite]
  "
        >
          {attemptsLeft.current} Attempts Left
        </h1>
      )}

      <Results
        open={resultsOpen}
        setOpen={setResultsOpen}
        title={resultTitle}
        description={resultDescription}
        pokemonHabitat={pokemonHabitatState}
        pokemonDescription={pokemonDescription}
        pokemonRegion={pokemonRegion}
        status={resultStatus}
        cry={pokemonCry}
        firstHint={firstHint}
        secondHint={secondHint}
        thirdHint={thirdHint}
        winTime={winTime}
      />
    </>
  );
};

export default RegionAnswerForm;
