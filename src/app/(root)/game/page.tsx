"use client";

const GamePage = () => {
  const trainerName = localStorage.getItem("guestTrainerName");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1>Welcome Trainer {trainerName}</h1>
    </div>
  );
};

export default GamePage;
