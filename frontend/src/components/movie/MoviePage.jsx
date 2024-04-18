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
      <div className="relative h-full min-h-screen overflow-hidden">
        <div
          style={{
            backgroundImage: movieBanner ? `url(${movieBanner})` : "none",
          }}
          className="absolute left-0 top-0 h-full min-h-screen w-full scale-110 bg-cover bg-no-repeat pt-20 blur-md"
        ></div>
        <div className="absolute left-0 top-0 h-full w-full bg-black/50"></div>
        <div className="no-scrollbar absolute left-0 top-0 flex h-full w-full flex-col gap-12 overflow-y-auto px-3 pb-10 pt-16 lg:flex-row lg:px-10">
          <img
            src={imagePrefix + movie?.poster_path}
            alt="poster"
            className="my-auto hidden max-h-[90%] rounded-lg lg:block"
          />
          <img
            src={imagePrefix + movie?.backdrop_path}
            className="mt-10 aspect-video max-h-[15rem] rounded-lg object-cover lg:hidden"
            alt="poster"
          ></img>
          <div className="space-y-1 text-lg lg:py-14">
            <h1 className="text-4xl font-black text-white lg:text-6xl">
              {movie?.title}
            </h1>
            <div className="py-1">
              {movie?.genre_ids?.map((genre, index) => (
                <p
                  className="mr-2 inline font-medium text-zinc-300"
                  key={index}
                >
                  {getGenreById(genre)}
                </p>
              ))}
            </div>

            <p className="font-bold text-zinc-200">
              ⭐ {movie?.vote_average.toFixed(1)} | 📅{" "}
              {formatDate(movie?.release_date)}
            </p>
            <div>
              <p className="font-bold text-white"></p>
            </div>
            <p className="max-w-3xl py-1 pb-4 text-white">{movie?.overview}</p>
            <div className="flex w-full justify-center lg:justify-start">
              <Button size="lg" className="py-6 text-lg" onClick={clickHandler}>
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
