import { useEffect, useState } from "react";
import Slider from "react-slick";
import { fetchTopMovies } from "@/lib/functions/tmdb";
import { currentMovieAtom } from "@/lib/store/store";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { RiArrowRightSLine } from "react-icons/ri";
import { RiArrowLeftSLine } from "react-icons/ri";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
        console.error("Error fetching popular movies:", error);
      }
    };
    getMovies();
  }, []);

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
          margin: 10,
        },
      },
    ],
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="my-5 pb-5">
      <h1 className="px-4 font-bold text-4xl mb-6">Popular Movies</h1>
      <div className="slider-container h-full px-3">
        <Slider {...settings}>
          {popularMovies?.map((movie) => (
            <div key={movie.id} className="pr-1 h-full overflow-hidden">
              <div
                onClick={() => handleClick(movie)}
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
};

export default PopularMovies;
