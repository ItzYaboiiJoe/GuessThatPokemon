// Modal to display Release Notes

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface NotesProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ReleaseNotes = ({ open, setOpen }: NotesProps) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        aria-describedby={undefined}
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        className="
          rounded-2xl border-4 border-red-500 
          bg-gradient-to-b from-yellow-100 via-orange-100 to-red-100 
          shadow-xl shadow-orange-300/40 p-8 
          max-w-2xl
        "
      >
        <DialogHeader>
          <DialogTitle className="text-center text-3xl font-extrabold text-red-600 drop-shadow mb-2">
            Release Notes
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[400px] pr-3">
          <div className="space-y-8 text-gray-800">
            {/* --- Version 0.7.5 --- */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">v0.7.5</h2>
              <p className="text-sm text-gray-600 italic mb-3">TBD</p>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-orange-700">
                    ✨ New Features
                  </p>
                  <ul className="list-disc list-inside text-sm">
                    <li>
                      Introduced <strong>Daily Login Streak</strong> tracking,
                      trainers can now earn streaks for consecutive daily play
                      sessions.
                    </li>
                    <li>
                      Displayed <strong>Daily Login Streak</strong> stat in the
                      Trainer Profile window.
                    </li>
                    <li>
                      Introduced <strong>Best Time</strong> tracking, trainers
                      can now see their fastest time guessing what is the
                      pokemon.
                    </li>
                    <li>
                      Displayed <strong>Best Time</strong> stat in the Trainer
                      profile window.
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-orange-700">
                    🧩 Improvements
                  </p>
                  <ul className="list-disc list-inside text-sm">
                    <li>
                      Optimized database logic to automatically initialize
                      missing streak data for returning users.
                    </li>
                    <li>
                      The user will be able to see how long it took to guess the
                      pokemon in the results window now.
                    </li>
                    <li>
                      There will be a limit of 6 attempts now to guess the
                      pokemon then it will auto reveal what was the pokemon.
                    </li>
                    <li>
                      Disabled the ability to paste text in input to prevent
                      users from pasting the answer in for cheating fast times
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-orange-700">🐞 Fixes</p>
                  <ul className="list-disc list-inside text-sm">
                    <li>
                      Fixed a potential edge case where new users without prior
                      streak data could cause undefined values.
                    </li>
                    <li>
                      There is a time counting now during the game menu to
                      record how long the user took to guess the pokemon.
                    </li>
                    <li>
                      There were cases where a user was able to change their
                      Trainer Name to an existing Trainer Name that was already
                      taken.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* --- Version 0.7.0 --- */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">v0.7.0</h2>
              <p className="text-sm text-gray-600 italic mb-3">
                Released October 7, 2025
              </p>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-orange-700">
                    ✨ New Features
                  </p>
                  <ul className="list-disc list-inside text-sm">
                    <li>Added the Trainer Profile feature</li>
                    <li>Added the ability to change your Trainer Name</li>
                    <li>Added the ability to change your password</li>
                    <li>
                      Added a countdown view on the Player Menu to show when the
                      next Pokémon becomes available
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-orange-700">
                    🧩 Improvements
                  </p>
                  <ul className="list-disc list-inside text-sm">
                    <li>Improved loading time on the landing page</li>
                    <li>Enhanced button shadows and colors</li>
                    <li>
                      When logged in, returning to the menu no longer signs you
                      out, it now brings you back to the Player Menu page
                    </li>
                    <li>
                      Increased font size in the &quot;Correct&quot; results
                      window
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-orange-700">🐞 Fixes</p>
                  <ul className="list-disc list-inside text-sm">
                    <li>
                      Fixed an issue where the Submission Date was not always
                      set correctly, allowing multiple submissions in a single
                      day
                    </li>
                    <li>
                      Fixed a rare issue where the leaderboard was not updating
                      correctly
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Close Button */}
        <div className="flex justify-center mt-8">
          <Button
            onClick={handleClose}
            className="bg-red-500 hover:bg-red-600 text-white font-bold rounded-full px-8 py-2 shadow-md cursor-pointer"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReleaseNotes;
