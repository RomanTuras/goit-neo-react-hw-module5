import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getTrendingMovies } from "../../api/movies.js";
import Loader from "../../components/Loader/Loader.jsx";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";
import MovieList from "../../components/MovieList/MovieList.jsx";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const { data } = await getTrendingMovies();
        setMovies([...data.results]);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (location.pathname === "/") {
      fetchTrendingMovies();
    }
  }, [location]);

  return (
    <div>
      <h1>Trending today</h1>
      <hr />
      <MovieList movies={movies} />
      {error && !isLoading && <ErrorMessage />}
      <Loader isVisible={isLoading} />
    </div>
  );
};

export default HomePage;
