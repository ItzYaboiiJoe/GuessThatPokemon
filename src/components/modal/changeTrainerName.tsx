// This modal for changing Trainer Name

"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { z } from "zod";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
import { updateTrainerName, checkTrainerName } from "../api/updateDisplayName";

interface updateNameProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const formSchema = z.object({
  trainerName: z
    .string()
    .nonempty("You must enter your trainer name")
    .min(3, "Trainer name must be at least 3 characters"),
});

const UpdateTrainerName = ({ open, setOpen }: updateNameProps) => {
  // State to control the spinner loading
  const [loading, setLoading] = useState(false);
  // State to manage check trainer name error
  const [checkError, setCheckError] = useState("");

  const originalName = localStorage.getItem("TrainerName")!;

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: { trainerName: "" },
    resolver: zodResolver(formSchema),
  });

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    const newTrainerName = values.trainerName;

    // Check if Trainer Name exists already
    const result = await checkTrainerName(newTrainerName);

    if (!result.success) {
      console.error("Error checking trainer:", result.error);
      setCheckError("An error occurred while checking trainer name.");
      setLoading(false);
      return;
    }

    if (result.exists) {
      setCheckError("Trainer name already exists. Please choose another one.");
      setLoading(false);
      return;
    }

    // Update Trainer Name API Call
    await updateTrainerName(newTrainerName, originalName);

    // Display success message and refreshes the page after few seconds
    toast.success("Trainer name updated successfully!");
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  // Function to close the modal
  const handleClose = () => {
    form.reset();
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="w-96 rounded-2xl bg-gradient-to-b from-yellow-100 via-white to-yellow-50 shadow-2xl border border-yellow-300"
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogHeader className="text-center">
            <DialogTitle className="bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-4 rounded-t-xl font-bold shadow-lg">
              Change Trainer Name
            </DialogTitle>
            <DialogDescription className="text-gray-700 text-sm">
              Enter your new Trainer Name you would like to change to
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {/* New Trainer Name Input */}
              <FormField
                control={form.control}
                name="trainerName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        disabled={loading}
                        placeholder="New Trainer Name"
                        className="text-center rounded-xl"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-center" />
                  </FormItem>
                )}
              />

              {/* Buttons */}
              <div className="flex justify-between mt-4">
                <Button
                  type="button"
                  onClick={handleClose}
                  className="bg-red-500 text-white rounded-full px-6 shadow-md hover:bg-red-600 cursor-pointer"
                  disabled={loading}
                >
                  Close
                </Button>
                {/* Submit button will display the loading to notify user the page is loading */}
                <Button
                  type="submit"
                  className="bg-yellow-400 text-black rounded-full px-6 shadow-md hover:bg-yellow-500 cursor-pointer"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <Spinner className="size-8" /> <span>Updating...</span>
                    </div>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>

              {/* Error Message if there were matching trainer names */}
              {checkError && (
                <p className="mt-4 text-center text-red-600 font-semibold">
                  {checkError}
                </p>
              )}
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateTrainerName;
