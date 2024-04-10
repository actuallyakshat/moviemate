import { fetchMoviesByGenre, getIdByGenre } from "@/lib/functions/tmdb";
import { userAtom, currentMovieAtom } from "@/lib/store/store";
import { useAtom, useAtomValue } from "jotai";
import { useState, useEffect } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

const NextArrow = ({ onClick }) => {
  return (
    <button
      className="bg-black/60 hover:bg-black/90 transition-colors h-fit rounded-full aspect-square w-14 flex items-center justify-center font-bold"
      style={{
        zIndex: 800,
        position: "absolute",
        right: 10,
        top: "50%",
        transform: "translateY(-50%)",
      }}
      onClick={onClick}
    >
      <RiArrowRightSLine className="text-white size-8" />
    </button>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <button
      className="bg-black/60 hover:bg-black/90 transition-colors h-fit rounded-full aspect-square w-14 flex items-center justify-center font-bold"
      style={{
        zIndex: 800,
        position: "absolute",
        left: 10,
        top: "50%",
        transform: "translateY(-50%)",
      }}
      onClick={onClick}
    >
      <RiArrowLeftSLine className="text-white size-8" />
    </button>
  );
};

const MoviesForYou = () => {
  const navigate = useNavigate();
  const [moviesForYou, setMoviesForYou] = useState(null);
  const [currentMovie, setCurrentMovie] = useAtom(currentMovieAtom);
  const user = useAtomValue(userAtom);
  const clickHandler = (movie) => {
    setCurrentMovie(movie);
    navigate("/movie");
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 7,
    slidesToScroll: 4,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          // Set spacing between slides
          variableWidth: false,
          slidesPerRow: 1,
          slidesPerColumn: 1,
          centerMode: true,
          centerPadding: "0px",
          // Adjust spacing here
          cssEase: "ease",
          edgeFriction: 0.35,
          rows: 1,
          vertical: false,
          // Add margin between slides
          margin: 10, // Adjust the value according to your preference
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          speed: 600,
          variableWidth: false,
          slidesPerRow: 1,
          slidesPerColumn: 1,
          centerMode: false,
          centerPadding: "0px",
          // Adjust spacing here
          cssEase: "ease",
          edgeFriction: 0.35,
          rows: 1,
          vertical: false,
          // Add margin between slides
          margin: 100, // Adjust the value according to your preference
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          // Set spacing between slides
          variableWidth: false,
          slidesPerRow: 1,
          slidesPerColumn: 1,
          centerMode: false,
          speed: 600,
          centerPadding: "0px",
          // Adjust spacing here
          cssEase: "ease",
          edgeFriction: 0.35,
          rows: 1,
          vertical: false,
          margin: 10,
        },
      },
    ],
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  useEffect(() => {
    const getMovies = async () => {
      try {
        if (user?.favoriteGenres) {
          const genreIds = user?.favoriteGenres?.map((genre) =>
            getIdByGenre(genre)
          );
          const response = await fetchMoviesByGenre(genreIds);
          setMoviesForYou(response);
        }
      } catch (error) {
        console.error("Error fetching latest movies:", error);
      }
    };
    getMovies();
  }, [user]);

  let movieContent = null;
  if (moviesForYou) {
    if (moviesForYou.length === 0) {
      movieContent = null;
    } else {
      movieContent = (
        <div className="my-5 pb-5">
          <h1 className="px-4 font-bold text-4xl mb-6">Movies For You</h1>
          <div className="px-4">
            <Slider {...settings}>
              {moviesForYou?.map((movie) => (
                <div key={movie.id} className="pr-1 h-full overflow-hidden">
                  <div
                    onClick={() => clickHandler(movie)}
                    className="cursor-pointer h-full rounded-lg relative overflow-hidden"
                  >
                    <img
                      src={`http://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt="poster"
                      className="object-cover h-full"
                    />
                    <div className="absolute inset-0 hover:bg-black/20 rounded-lg transition duration-200"></div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      );
    }
  } else {
    movieContent = <p>Loading...</p>;
  }

  return movieContent;
};

export default MoviesForYou;
