import Image from "next/image";

const LoadingPage = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen animate-spin">
      <Image
        src="/pokeball.png"
        alt="Loading..."
        width={150}
        height={150}
        priority={true}
      />
    </div>
  );
};

export default LoadingPage;
