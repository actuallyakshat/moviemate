import Banner from "./Banner";
import LatestMovies from "./LatestMovies";

const Dashboard = () => {
  return (
    <div className="h-full pt-16">
      <Banner />
      <LatestMovies />
    </div>
  );
};

export default Dashboard;
