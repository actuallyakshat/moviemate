import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchLatestMovies } from "@/lib/functions/tmdb";
import { currentMovieAtom } from "@/lib/store/store";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiArrowRightSLine } from "react-icons/ri";
import { RiArrowLeftSLine } from "react-icons/ri";
import Loading from "../Loading/Loading";

const NextArrow = ({ onClick }) => {
  return (
    <button
      className="flex aspect-square h-fit w-14 items-center justify-center rounded-full bg-black/60 font-bold transition-colors hover:bg-black/90"
      style={{
        zIndex: 800,
        position: "absolute",
        right: 10,
        top: "50%",
        transform: "translateY(-50%)",
      }}
      onClick={onClick}
    >
      <RiArrowRightSLine className="size-8 text-white" />
    </button>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <button
      className="flex aspect-square h-fit w-14 items-center justify-center rounded-full bg-black/60 font-bold transition-colors hover:bg-black/90"
      style={{
        zIndex: 800,
        position: "absolute",
        left: 10,
        top: "50%",
        transform: "translateY(-50%)",
      }}
      onClick={onClick}
    >
      <RiArrowLeftSLine className="size-8 text-white" />
    </button>
  );
};

const LatestMovies = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [latestMovies, setLatestMovies] = useState(null);
  const [currentMovie, setCurrentMovie] = useAtom(currentMovieAtom);

  const handleButtonClick = (movie) => {
    setCurrentMovie(movie);
    navigate("/movie");
  };

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        const response = await fetchLatestMovies();
        setLatestMovies(response);
      } catch (error) {
        console.error("Error fetching latest movies:", error);
      }
      setLoading(false);
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
          variableWidth: false,
          speed: 600,
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
          speed: 600,
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

  if (loading) {
    return <Loading />;
  }

  if (!latestMovies)
    return (
      <div>
        <h1 className="p-4 text-xl font-bold text-opacity-60">
          Oops, We had an error fetching the content for you
        </h1>
      </div>
    );

  return (
    <div className="mt-16 h-full pb-6">
      <h1 className="mb-6 px-4 text-4xl font-bold">Latest Movies</h1>
      <div className="slider-container h-full px-3">
        <Slider {...settings}>
          {latestMovies?.map((movie) => (
            <div key={movie.id} className="h-full overflow-hidden pr-1">
              <div
                onClick={() => handleButtonClick(movie)}
                className="relative h-full cursor-pointer overflow-hidden rounded-lg"
              >
                <img
                  src={`http://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt="poster"
                  className="h-full object-cover"
                />
                <div className="absolute inset-0 rounded-lg transition duration-200 hover:bg-black/20"></div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default LatestMovies;
