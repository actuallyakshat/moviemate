import { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { fetchSearchMovies } from "@/lib/functions/tmdb";
import { currentMovieAtom } from "@/lib/store/store";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";

const SearchModal = ({ setModal }) => {
  const searchBarRef = useRef(null);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [currentMovie, setCurrentMovie] = useAtom(currentMovieAtom);

  useEffect(() => {
    searchBarRef?.current?.focus();
  }, []);

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
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="no-scrollbar fixed inset-0 z-[1000] overflow-y-auto bg-black/90">
      <div
        onClick={() => setModal(false)}
        className="ml-auto w-fit pb-6 pr-8 pt-6 hover:text-destructive md:pr-12"
      >
        <button className="text-2xl font-medium text-white hover:text-destructive">
          X
        </button>
      </div>
      <div className="mx-auto max-w-7xl px-4">
        <Input
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setModal(false);
            }
          }}
          ref={searchBarRef}
          placeholder="Search a movie"
          onChange={handleInputChange}
          value={searchQuery}
          className="mx-auto max-w-2xl bg-white text-black"
        />
      </div>
      <div className="flex flex-wrap justify-center gap-6 px-4 py-8 md:px-10">
        {results
          ?.filter((result) => result.poster_path || result.backdrop_path) // Filter out results without poster_path or backdrop_path
          .map((result) => (
            <div
              key={result.id}
              onClick={() => clickHandler(result)}
              className="max-w-[20rem] cursor-pointer transition-opacity hover:opacity-80"
            >
              {result.poster_path && ( // Check if poster_path exists
                <>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
                    className="max-w-[10rem]"
                  />
                  <h1 className="max-w-[15ch] text-sm font-bold text-white">
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
