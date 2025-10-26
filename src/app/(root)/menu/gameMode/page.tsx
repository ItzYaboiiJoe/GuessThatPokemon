import Link from "next/link";
import { Button } from "@/components/ui/button";
import CountdownTimer from "@/components/tools/countdownTimer";

const GameMode = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="grid grid-cols-2 gap-6 items-center">
        {/* National */}
        <div className="flex flex-col items-center gap-3">
          {/* Countdown */}
          <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-semibold px-4 py-1 rounded-full shadow-md shadow-orange-200/60 border border-orange-300">
            <p>New Challenge In:</p>
            <CountdownTimer targetTime="00:00" />
          </div>

          {/* Game Mode Card */}
          <div className="bg-white/90 rounded-xl shadow-xl shadow-orange-200/50 p-8 responsePhones text-center">
            <h1 className="text-3xl font-bold mb-6">National Game Mode</h1>
          </div>
        </div>

        {/* Regional */}
        <div className="flex flex-col items-center gap-3">
          {/* Countdown */}
          <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-semibold px-4 py-1 rounded-full shadow-md shadow-orange-200/60 border border-orange-300">
            <p>New Challenge In:</p>
            <CountdownTimer />
          </div>

          {/* Game Mode Card */}
          <div className="bg-white/90 rounded-xl shadow-xl shadow-orange-200/50 p-8 responsePhones text-center">
            <h1 className="text-3xl font-bold mb-6">Region Game Mode</h1>
          </div>
        </div>
      </div>

      {/* Back to Home Button */}
      <Button
        asChild
        variant={"default"}
        className="mt-6 bg-red-600 hover:bg-red-800"
      >
        <Link href="/menu">Return to Menu</Link>
      </Button>
    </div>
  );
};

export default GameMode;
