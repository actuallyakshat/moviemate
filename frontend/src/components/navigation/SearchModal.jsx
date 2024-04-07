import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { fetchSearchMovies } from "@/lib/functions/tmdb";
import { currentMovieAtom } from "@/lib/store/store";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";

const SearchModal = ({ setModal }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [currentMovie, setCurrentMovie] = useAtom(currentMovieAtom);

  const clickHandler = (movie) => {
    setCurrentMovie(movie);
    setModal(false);
    navigate("/movie");
  };

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      fetchMovies();
    } else {
      setResults([]);
    }
  }, [searchQuery]);

  const fetchMovies = async () => {
    try {
      const response = await fetchSearchMovies(searchQuery);
      setResults(response);
      console.log("Fetching movies for:", searchQuery);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="fixed overflow-y-auto no-scrollbar inset-0 bg-black/90 z-[1000]">
      <div
        onClick={() => setModal(false)}
        className="w-fit hover:text-destructive ml-auto pr-12 pt-6"
      >
        <button className="text-white text-2xl font-medium">X</button>
      </div>
      <div className="max-w-7xl mx-auto">
        <Input
          placeholder="Search a movie"
          onChange={handleInputChange}
          value={searchQuery}
          className="text-white"
        />
      </div>
      <div className="flex justify-center flex-wrap py-8 gap-6 px-4 md:px-10">
        {results
          ?.filter((result) => result.poster_path || result.backdrop_path) // Filter out results without poster_path or backdrop_path
          .map((result) => (
            <div
              key={result.id}
              onClick={() => clickHandler(result)}
              className="cursor-pointer max-w-[20rem] hover:opacity-80 transition-opacity"
            >
              {result.poster_path && ( // Check if poster_path exists
                <>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
                    className="max-w-[10rem]"
                  />
                  <h1 className="font-bold max-w-[15ch] text-sm text-white">
                    {result.title}
                  </h1>
                </>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchModal;
