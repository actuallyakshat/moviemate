import LoadingSpinner from "./LoadingSpinner";

const Loading = () => {
  return (
    <div className="z-[1001] bg-background flex flex-col gap-4 justify-center items-center font-bold fixed inset-0">
      <LoadingSpinner />
      <h1 className="text-2xl">Loading Movie Mate</h1>
    </div>
  );
};

export default Loading;
