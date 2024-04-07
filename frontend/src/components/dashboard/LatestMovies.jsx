import { fetchLatestMovies } from "@/lib/functions/tmdb";
import { currentMovieAtom } from "@/lib/store/store";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LatestMovies = () => {
  const navigate = useNavigate();
  const [latestMovies, setLatestMovies] = useState(null);
  const [currentMovie, setCurrentMovie] = useAtom(currentMovieAtom);

  const handleButtonClick = (movie) => {
    setCurrentMovie(movie);
    navigate("/movie");
  };

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await fetchLatestMovies();
        setLatestMovies(response);
      } catch (error) {
        console.error("Error fetching latest movies:", error);
      }
    };
    getMovies();
  }, []);

  return (
    <div className="h-full mt-16 pb-6">
      <h1 className="px-16 font-bold text-4xl mb-6">Latest Movies</h1>
      <div className="my-3 px-4 flex gap-3 max-w-screen overflow-y-auto no-scrollbar no-scrollbar no-scrollbar">
        {latestMovies?.map((movie) => (
          <div
            key={movie.id}
            onClick={() => handleButtonClick(movie)}
            className="cursor-pointer"
          >
            <img
              src={`http://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt="poster"
              className="rounded-lg min-w-[15rem]"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestMovies;
