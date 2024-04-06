import { getBannerMovie } from "@/lib/functions/tmdb";
import { useEffect, useState } from "react";
import Banner from "./Banner";

const Dashboard = () => {
  return (
    <div className="h-full">
      <Banner />
    </div>
  );
};

export default Dashboard;
