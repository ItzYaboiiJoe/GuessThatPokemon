// Modal component to send a feedback
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";

interface FeedbackProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const formSchema = z.object({
  feedback: z.string().nonempty("Feedback cannot be empty"),
});

const Feedback = ({ open, setOpen }: FeedbackProps) => {
  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: { feedback: "" },
    resolver: zodResolver(formSchema),
  });

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  // Function to close the modal
  const handleClose = () => {
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="w-96 rounded-2xl bg-gradient-to-b from-yellow-100 via-white to-yellow-50 shadow-2xl border border-yellow-300"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader className="text-center">
          <DialogTitle className="bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-4 rounded-t-xl font-bold shadow-lg">
            Feedback
          </DialogTitle>

          <DialogDescription className="text-gray-700 text-sm">
            For any new features or modifications, let us know below
          </DialogDescription>
        </DialogHeader>

        {/* form Text Area */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="feedback"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      className="mb-2 w-full rounded-lg border border-gray-300 bg-gray-50 shadow-inner focus:ring-2 focus:ring-yellow-500 focus:outline-none focus:border-yellow-500"
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
              >
                Close
              </Button>
              <Button
                type="submit"
                className="bg-yellow-400 text-black rounded-full px-6 shadow-md hover:bg-yellow-500 cursor-pointer"
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default Feedback;
