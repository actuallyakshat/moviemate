import { fetchMoviesByGenre, getIdByGenre } from "@/lib/functions/tmdb";
import { currentMovieAtom } from "@/lib/store/store";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const favouriteGenres = ["Romance"];

const MoviesForYou = () => {
  const genreIds = favouriteGenres.map((genre) => getIdByGenre(genre));
  const navigate = useNavigate();
  const [moviesForYou, setMoviesForYou] = useState(null);
  const [currentMovie, setCurrentMovie] = useAtom(currentMovieAtom);
  const clickHandler = (movie) => {
    setCurrentMovie(movie);
    navigate("/movie");
  };
  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await fetchMoviesByGenre(genreIds);
        setMoviesForYou(response);
      } catch (error) {
        console.error("Error fetching latest movies:", error);
      }
    };
    getMovies();
  }, []);
  return (
    <div className="my-5 pb-5">
      <h1 className="px-4 font-bold text-4xl mb-6">Movies for you</h1>
      <div className="my-3 flex gap-3 max-w-screen overflow-y-auto no-scrollbar px-4">
        {moviesForYou?.map((movie) => (
          <div
            key={movie.id}
            onClick={() => clickHandler(movie)}
            className="cursor-pointer overflow-hidden rounded-lg min-w-[17rem] relative"
          >
            <img
              src={`http://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt="poster"
            />
            <div className="absolute inset-0 hover:bg-black/20 rounded-lg transition duration-200"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviesForYou;
