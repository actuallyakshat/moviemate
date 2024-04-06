import { getBannerMovie } from "@/lib/functions/tmdb";
import { useEffect, useState } from "react";

const Banner = () => {
  const imagePrefix = "http://image.tmdb.org/t/p/w500";
  const [bannerMovie, setBannerMovie] = useState(null);
  const [backdrop, setBackdrop] = useState(null);

  useEffect(() => {
    const getMovies = async () => {
      const response = await getBannerMovie();
      console.log(response);
      setBannerMovie(response);
      setBackdrop(`${imagePrefix}${response.backdrop_path}`);
    };
    getMovies();
  }, []);

  return (
    <div className="w-full bg-zinc-400 min-h-[25rem] p-12 bg-no-repeat bg-cover rounded-2xl relative">
      <div
        style={{ backgroundImage: backdrop ? `url(${backdrop})` : "none" }}
        className="w-full h-full rounded-2xl blur-lg absolute top-0 left-0 bg-cover bg-no-repeat"
      ></div>
      {/* <div>{backdrop && <img src={backdrop} alt="backdrop image" />}</div> */}
      <div>
        <h1 className="text-2xl text-white font-black">
          {bannerMovie?.original_title}
        </h1>
      </div>
    </div>
  );
};

export default Banner;
