import MovieList from "../../components/MovieList/MovieList";
import SearchForm from "../../components/SearchForm/SearchForm.jsx";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../api/movies.js";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  useEffect(() => {
    const fetchMoviesByQuery = async (query) => {
      try {
        const { data } = await searchMovies(query);
        setMovies(data.results);
      } catch {
        console.log("error");
      }
    };
    if (query && query.length > 1) {
      fetchMoviesByQuery(query);
    }
  }, [query]);

  return (
    <>
      <SearchForm />

      <MovieList movies={movies} />
    </>
  );
};

export default MoviesPage;