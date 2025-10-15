const convertSeconds = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds! / 60);
  const seconds = totalSeconds! % 60;
  const formatMinutes = String(minutes).padStart(2, "0");
  const formatSeconds = String(seconds).padStart(2, "0");
  return `${formatMinutes}:${formatSeconds}`;
};

export default convertSeconds;
