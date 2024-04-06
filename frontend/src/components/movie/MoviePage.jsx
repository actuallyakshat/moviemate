import { formatDate, getGenreById } from "@/lib/functions/tmdb";
import { Button } from "../ui/button";

const imagePrefix = "http://image.tmdb.org/t/p/w500";
const MoviePage = () => {
  const movie = {
    adult: false,
    backdrop_path: "/1XDDXPXGiI8id7MrUxK36ke7gkX.jpg",
    genre_ids: [28, 12, 16, 35, 10751],
    id: 1011985,
    original_language: "en",
    original_title: "Kung Fu Panda 4",
    overview:
      "Po is gearing up to become the spiritual leader of his Valley of Peace, but also needs someone to take his place as Dragon Warrior. As such, he will train a new kung fu practitioner for the spot and will encounter a villain called the Chameleon who conjures villains from the past.",
    popularity: 2101.694,
    poster_path: "/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg",
    release_date: "2024-03-02",
    title: "Kung Fu Panda 4",
    video: false,
    vote_average: 6.752,
    vote_count: 606,
  };
  const movieBanner = `${imagePrefix}${movie.backdrop_path}`;

  return (
    <div className="min-h-screen h-full overflow-hidden">
      <div
        style={{
          backgroundImage: movieBanner ? `url(${movieBanner})` : "none",
        }}
        className="min-h-screen h-full pt-20 blur-md scale-110 bg-no-repeat bg-cover"
      ></div>
      <div className="min-h-screen h-full w-full absolute bg-black/50 top-0"></div>

      <div className="absolute top-0 left-0 w-full h-full pt-16 flex flex-col lg:flex-row gap-12 px-3 lg:px-10">
        <img
          src={imagePrefix + movie.poster_path}
          alt="poster"
          className="max-h-[90%] hidden lg:block rounded-lg my-auto"
        />
        <img
          src={imagePrefix + movie.backdrop_path}
          className="lg:hidden max-h-[15rem] mt-10 object-cover aspect-video rounded-lg"
          alt="poster"
        ></img>
        <div className="lg:py-14 space-y-1 text-lg">
          <h1 className="text-4xl lg:text-6xl text-white font-black">
            {movie?.title}
          </h1>
          <div className="py-1">
            {movie?.genre_ids.map((genre) => (
              <p
                className="inline text-zinc-300 mr-2 font-medium"
                key={genre.index}
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
            <Button size="lg" className="text-lg py-6">
              Find Mates for {movie.title}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
