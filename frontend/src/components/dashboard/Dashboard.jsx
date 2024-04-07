import Banner from "./Banner";
import LatestMovies from "./LatestMovies";
import MoviesForYou from "./MoviesForYou";
import PopularMovies from "./PopularMovies";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Dashboard = () => {
  return (
    <div className="h-full pt-16">
      <Banner />
      <LatestMovies />
      <PopularMovies />
      <MoviesForYou />
    </div>
  );
};

export default Dashboard;
