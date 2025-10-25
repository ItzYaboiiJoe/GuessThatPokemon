import Link from "next/link";
import { Button } from "@/components/ui/button";

const GameMode = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="grid grid-cols-2 gap-6">
        {/* National Game Mode */}
        <div className="bg-white/90 rounded-xl shadow-xl shadow-orange-200/50 p-8 responsePhones text-center">
          <h1 className="text-3xl font-bold mb-6">National Game Mode</h1>
        </div>

        {/* Region Game Mode */}
        <div className="bg-white/90 rounded-xl shadow-xl shadow-orange-200/50 p-8 responsePhones text-center">
          <h1 className="text-3xl font-bold mb-6">Region Game Mode</h1>
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
