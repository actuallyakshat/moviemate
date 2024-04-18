import { formatDate, getGenreById } from "@/lib/functions/tmdb";
import { Button } from "../ui/button";
import { useAtomValue } from "jotai";
import { currentMovieAtom, userAtom } from "@/lib/store/store";
import FindMateModal from "./FindMateModal";
import { useState } from "react";
import { useToast } from "../ui/use-toast";

const imagePrefix = "http://image.tmdb.org/t/p/w500";
const MoviePage = () => {
  const { toast } = useToast();
  const [modal, setModal] = useState(false);
  const movie = useAtomValue(currentMovieAtom);
  const movieBanner = `${imagePrefix}${movie?.backdrop_path}`;
  const user = useAtomValue(userAtom);
  const clickHandler = () => {
    if (user.onboardingCompleted) {
      setModal(true);
    } else {
      toast({
        title: "Profile Incomplete",
        description: "Please complete your profile to continue",
        variant: "destructive",
      });
    }
  };
  return (
    <>
      {modal && <FindMateModal setModal={setModal} movie={movie} />}
      <div className="min-h-screen h-full overflow-hidden relative">
        <div
          style={{
            backgroundImage: movieBanner ? `url(${movieBanner})` : "none",
          }}
          className="min-h-screen h-full pt-20 blur-md scale-110 bg-no-repeat bg-cover absolute top-0 left-0 w-full"
        ></div>
        <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>
        <div className="absolute top-0 left-0 w-full h-full pt-16 pb-10 flex flex-col lg:flex-row gap-12 px-3 lg:px-10 no-scrollbar overflow-y-auto">
          <img
            src={imagePrefix + movie?.poster_path}
            alt="poster"
            className="max-h-[90%] hidden lg:block rounded-lg my-auto"
          />
          <img
            src={imagePrefix + movie?.backdrop_path}
            className="lg:hidden max-h-[15rem] mt-10 object-cover aspect-video rounded-lg"
            alt="poster"
          ></img>
          <div className="lg:py-14 space-y-1 text-lg">
            <h1 className="text-4xl lg:text-6xl text-white font-black">
              {movie?.title}
            </h1>
            <div className="py-1">
              {movie?.genre_ids?.map((genre, index) => (
                <p
                  className="inline text-zinc-300 mr-2 font-medium"
                  key={index}
                >
                  {getGenreById(genre)}
                </p>
              ))}
            </div>

            <p className="text-zinc-200 font-bold">
              ⭐ {movie?.vote_average.toFixed(1)} | 📅{" "}
              {formatDate(movie?.release_date)}
            </p>
            <div>
              <p className="text-white font-bold"></p>
            </div>
            <p className="text-white max-w-3xl py-1 pb-4">{movie?.overview}</p>
            <div className="w-full flex justify-center lg:justify-start">
              <Button size="lg" className="text-lg py-6" onClick={clickHandler}>
                Find Mates for {movie?.title}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MoviePage;
