import { fetchMoviesByGenre, getIdByGenre } from "@/lib/functions/tmdb";
import { useEffect, useState } from "react";

const favouriteGenres = ["Romance"];

const MoviesForYou = () => {
  const genreIds = favouriteGenres.map((genre) => getIdByGenre(genre));
  const [moviesForYou, setMoviesForYou] = useState(null);
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
    <div className="my-5">
      <h1 className="px-16 font-bold text-3xl">Movies for you</h1>
      <div className="my-3 flex gap-3 max-w-screen overflow-y-auto">
        {moviesForYou?.map((movie) => (
          <div key={movie.id}>
            <img
              src={`http://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt="poster"
              className="rounded-lg min-w-[10rem]"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviesForYou;
