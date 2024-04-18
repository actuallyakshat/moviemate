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

  return (
    <div className="w-full min-h-[27rem] bg-no-repeat bg-cover overflow-hidden relative">
      <div
        style={{ backgroundImage: backdrop ? `url(${backdrop})` : "none" }}
        className="w-full h-full blur-md absolute top-0 left-0 bg-cover bg-no-repeat max-w-screen scale-110"
      ></div>
      <div className="w-full h-full bg-black/50 blur-md absolute top-0 left-0 bg-cover bg-no-repeat scale-110 max-w-screen"></div>
      <div className="relative top-0 left-0 w-full h-full py-10 flex gap-12 px-6 lg:px-16 max-w-screen">
        {bannerMovie && (
          <img
            src={`${imagePrefix}${bannerMovie?.poster_path}`}
            alt="poster"
            className="max-h-[25rem] h-full rounded-lg hidden lg:block my-auto"
          />
        )}
        <div className="py-8 space-y-1">
          <h1 className="text-4xl text-white font-black">
            {bannerMovie?.title}
          </h1>
          <div className="py-1">
            {bannerMovie?.genre_ids.map((genre) => (
              <p
                className="inline text-zinc-300 mr-2 font-medium"
                key={genre.index}
              >
                {getGenreById(genre)}
              </p>
            ))}
          </div>

          <p className="text-zinc-200 font-bold">
            ⭐ {bannerMovie?.vote_average.toFixed(1)} | 📅{" "}
            {formatDate(bannerMovie?.release_date)}
          </p>
          <div>
            <p className="text-white font-bold"></p>
          </div>
          <p className="text-white max-w-3xl pt-1 pb-4">
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
