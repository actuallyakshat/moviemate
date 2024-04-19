import { formatDate, getBannerMovie, getGenreById } from "@/lib/functions/tmdb";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";
import { currentMovieAtom } from "@/lib/store/store";
import Loading from "../Loading/Loading";

const Banner = () => {
  const [loading, setLoading] = useState(true);
  const setCurrentMovie = useSetAtom(currentMovieAtom);
  const navigate = useNavigate();
  const imagePrefix = "http://image.tmdb.org/t/p/w500";
  const [bannerMovie, setBannerMovie] = useState(null);
  const [backdrop, setBackdrop] = useState(null);
  const clickHandler = (movie) => {
    navigate(`/movie`);
    setCurrentMovie(movie);
  };

  useEffect(() => {
    const getMovies = async () => {
      const response = await getBannerMovie();
      setLoading(false);
      setBannerMovie(response);
      setBackdrop(`${imagePrefix}${response.backdrop_path}`);
    };
    getMovies();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!bannerMovie)
    return (
      <div>
        <h1 className="p-4 text-xl font-bold text-opacity-60">
          Oops, We had an error fetching the content for you
        </h1>
      </div>
    );

  return (
    <div className="relative min-h-[27rem] w-full overflow-hidden bg-cover bg-no-repeat">
      <div
        style={{ backgroundImage: backdrop ? `url(${backdrop})` : "none" }}
        className="max-w-screen absolute left-0 top-0 h-full w-full scale-110 bg-cover bg-no-repeat blur-md"
      ></div>
      <div className="max-w-screen absolute left-0 top-0 h-full w-full scale-110 bg-black/50 bg-cover bg-no-repeat blur-md"></div>
      <div className="max-w-screen relative left-0 top-0 flex h-full w-full gap-12 px-6 py-10 lg:px-16">
        {bannerMovie && (
          <img
            src={`${imagePrefix}${bannerMovie?.poster_path}`}
            alt="poster"
            className="my-auto hidden h-full max-h-[25rem] rounded-lg lg:block"
          />
        )}
        <div className="space-y-1 py-8">
          <h1 className="text-4xl font-black text-white">
            {bannerMovie?.title}
          </h1>
          <div className="py-1">
            {bannerMovie?.genre_ids.map((genre) => (
              <p
                className="mr-2 inline font-medium text-zinc-300"
                key={genre.index}
              >
                {getGenreById(genre)}
              </p>
            ))}
          </div>

          <p className="font-bold text-zinc-200">
            ⭐ {bannerMovie?.vote_average.toFixed(1)} | 📅{" "}
            {formatDate(bannerMovie?.release_date)}
          </p>
          <div>
            <p className="font-bold text-white"></p>
          </div>
          <p className="max-w-3xl pb-4 pt-1 text-white">
            {bannerMovie?.overview}
          </p>
          <Button
            className="bottom-8"
            onClick={() => clickHandler(bannerMovie)}
          >
            Find Mates
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
