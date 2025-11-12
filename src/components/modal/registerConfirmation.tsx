// Modal component to confirm successful registration
// Displays trainer name and email, and prompts user to confirm their email

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import * as motion from "motion/react-client";

interface RegistrationConfirmationProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  email: string;
  trainerName: string;
}

const RegistrationConfirmation = ({
  open,
  setOpen,
  email,
  trainerName,
}: RegistrationConfirmationProps) => {
  const router = useRouter();

  // Handle the "Ok" button click
  const handleOk = () => {
    setOpen(false);
    router.push("/login");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="w-96 rounded-2xl shadow-2xl bg-gradient-to-b from-yellow-100 via-orange-100 to-white"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.4,
            delay: 0.2,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl font-extrabold text-yellow-500 drop-shadow text-center">
              Registration Successful!
            </DialogTitle>
            <DialogDescription className="text-gray-700 mt-2 text-center">
              Please confirm your email to be able to log in
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 gap-2 text-center mt-4 text-gray-800 font-medium">
            <div>
              <span className="font-bold">Trainer Name:</span> {trainerName}
            </div>
            <div>
              <span className="font-bold">Email:</span> {email}
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <Button
              onClick={handleOk}
              className="w-full bg-yellow-400 text-black font-bold text-lg py-3 rounded-xl shadow-md hover:bg-yellow-300 hover:cursor-pointer"
            >
              Ok
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationConfirmation;
