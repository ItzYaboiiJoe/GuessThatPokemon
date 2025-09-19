// This file will display the results modal when a user submits an answer
// It will display either correct or incorrect
// It will also display the results when the user already submitted the answer for the day

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

interface resultsProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Results = ({ open, setOpen }: resultsProps) => {
  // Function to close the modal
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="w-96 rounded-2xl shadow-2xl bg-gradient-to-b from-yellow-100 via-orange-100 to-white"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader className="text-center">
          <DialogTitle className="text-center">Test Title</DialogTitle>
          <DialogDescription className="text-center">
            Test Description
          </DialogDescription>
        </DialogHeader>

        <div>
          <span>Insert Hints and pokemon types here</span>
        </div>

        <div className="mt-6 flex justify-center">
          <Button className="hover:cursor-pointer" onClick={handleClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Results;
