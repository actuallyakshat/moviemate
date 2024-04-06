import { fetchTopMovies } from "@/lib/functions/tmdb";
import { currentMovieAtom } from "@/lib/store/store";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PopularMovies = () => {
  const navigate = useNavigate();
  const [currentMovie, setCurrentMovie] = useAtom(currentMovieAtom);
  const [popularMovies, setPopularMovies] = useState(null);
  const handleClick = (movie) => {
    setCurrentMovie(movie);
    navigate("/movie");
  };
  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await fetchTopMovies();
        setPopularMovies(response);
      } catch (error) {
        console.error("Error fetching latest movies:", error);
      }
    };
    getMovies();
  }, []);
  return (
    <div className="my-5">
      <h1 className="px-16 font-bold text-3xl">Popular Movies</h1>
      <div className="my-3 flex gap-3 max-w-screen overflow-y-auto">
        {popularMovies?.map((movie) => (
          <div
            key={movie.id}
            className="cursor-pointer"
            onClick={() => handleClick(movie)}
          >
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

export default PopularMovies;