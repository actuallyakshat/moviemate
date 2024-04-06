//latest movies
import axios from "axios";
const fetchLatestMovies = async () => {
  try {
    const promises = [];

    for (let i = 1; i <= 2; i++) {
      const promise = axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${i}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
          },
        }
      );
      promises.push(promise);
    }

    const responses = await Promise.all(promises);
    let movieData = responses.flatMap((response) => response.data.results);

    // Filter out movies with adult flag set to true
    movieData = movieData.filter((movie) => !movie.adult);

    // Extract unique movie IDs
    const uniqueMovieIds = new Set();
    const uniqueMovies = [];
    for (const movie of movieData) {
      if (!uniqueMovieIds.has(movie.id)) {
        uniqueMovieIds.add(movie.id);
        uniqueMovies.push(movie);
      }
    }

    // Shuffle the array
    return shuffleArray(uniqueMovies);
  } catch (error) {
    console.error("Error fetching latest movies:", error);
    return []; // Return empty array if an error occurs
  }
};

//popular movies
const fetchTopMovies = async () => {
  try {
    const promises = [];

    for (let i = 1; i <= 5; i++) {
      const promise = axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${i}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
          },
        }
      );
      promises.push(promise);
    }

    const responses = await Promise.all(promises);
    let movieData = responses.flatMap((response) => response.data.results);

    // Filter movies with original_language 'en' or 'hi'
    movieData = movieData.filter((movie) =>
      ["en", "hi"].includes(movie.original_language)
    );

    // Extract unique movie IDs
    const uniqueMovieIds = new Set();
    const uniqueMovies = [];
    for (const movie of movieData) {
      if (!uniqueMovieIds.has(movie.id)) {
        uniqueMovieIds.add(movie.id);
        uniqueMovies.push(movie);
      }
    }

    // Shuffle the array
    return shuffleArray(uniqueMovies);
  } catch (error) {
    console.error("Error fetching top movies:", error);
    return []; // Return empty array if an error occurs
  }
};

// Function to remove duplicates from array of objects based on a key
// Function to shuffle array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

//movies by genre
const genre = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];
const getGenreById = (genreId) => {
  return genre.find((g) => g.id === genreId).name;
};
const getIdByGenre = (genreName) => {
  return genre.find((g) => g.name === genreName).id;
};
const fetchMoviesByGenre = async (genreIds) => {
  try {
    const promises = genreIds.map((genreId) => {
      return axios.get(
        `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&page=1`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
          },
        }
      );
    });

    const responses = await Promise.all(promises);
    let movieData = responses.flatMap((response) => response.data.results);

    // Extract unique movie IDs
    const uniqueMovieIds = new Set();
    const uniqueMovies = [];
    for (const movie of movieData) {
      if (!uniqueMovieIds.has(movie.id)) {
        uniqueMovieIds.add(movie.id);
        uniqueMovies.push(movie);
      }
    }

    return shuffleArray(uniqueMovies);
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
    return []; // Return empty array if an error occurs
  }
};

//search movies
const fetchSearchMovies = async (query) => {
  const response = await axios.get(
    "https://api.themoviedb.org/3/search/movie?language=en-US&page=1&include_adult=false",
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
      params: {
        query,
      },
    }
  );
  return response.data.results;
};

const getBannerMovie = async () => {
  try {
    const response = await fetchLatestMovies();
    // Check if response is not empty
    if (response.length > 0) {
      const randomIndex = Math.floor(Math.random() * response.length);
      const randomMovie = response[randomIndex];
      return randomMovie;
    }
  } catch (error) {
    console.error("Error fetching latest movies for banner:", error);
  }
};

function formatDate(dateString) {
  if (!dateString) return null;
  // Split the date string into year, month, and day
  const [year, month, day] = dateString.split("-");

  // Create an array of month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Convert day to a number and add the appropriate suffix
  let dayWithSuffix;
  switch (day.slice(-1)) {
    case "1":
      dayWithSuffix = day + "st";
      break;
    case "2":
      dayWithSuffix = day + "nd";
      break;
    case "3":
      dayWithSuffix = day + "rd";
      break;
    default:
      dayWithSuffix = day + "th";
  }

  // Get the month name
  const monthName = monthNames[parseInt(month, 10) - 1];

  // Construct the formatted date string
  const formattedDate = `${dayWithSuffix} ${monthName}, ${year}`;

  return formattedDate;
}

export {
  fetchLatestMovies,
  fetchTopMovies,
  fetchMoviesByGenre,
  getGenreById,
  getIdByGenre,
  fetchSearchMovies,
  getBannerMovie,
  formatDate,
};
