import { fetchLatestMovies } from "@/lib/functions/tmdb";
import { useEffect, useState } from "react";

const LatestMovies = () => {
  const [latestMovies, setLatestMovies] = useState(null);

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
    <div className="h-full mt-20">
      <h1 className="px-16 font-bold text-3xl">Latest Movies</h1>
      <div className="my-3 flex gap-3 max-w-screen overflow-y-auto">
        {latestMovies?.map((movie) => (
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

export default LatestMovies;
