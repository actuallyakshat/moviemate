import { fetchTopMovies } from "@/lib/functions/tmdb";
import { currentMovieAtom } from "@/lib/store/store";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

const PopularMovies = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
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
    <div className="my-5 pb-5">
      <h1 className="px-4 font-bold text-4xl mb-6">Popular Movies</h1>
      <div className="my-3 px-4 flex gap-3 max-w-screen overflow-y-auto no-scrollbar">
        {popularMovies?.map((movie) => (
          <div
            key={movie.id}
            className="cursor-pointer overflow-hidden relative rounded-lg min-w-[17rem]"
            onClick={() => handleClick(movie)}
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

export default PopularMovies;
