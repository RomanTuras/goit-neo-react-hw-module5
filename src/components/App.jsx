import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "../components/Navigation/Navigation.jsx";
import { getTrendingMovies } from "../api/movies.js";
import Container from "../components/Container/Container.jsx"

const HomePage = lazy(() => import("../pages/HomePage/HomePage.jsx"));
const MoviesPage = lazy(() => import("../pages/MoviesPage/MoviesPage.jsx"));
const MovieDetailsPage = lazy(() =>
  import("../pages/MovieDetailsPage/MovieDetailsPage.jsx")
);
const MovieCast = lazy(() => import("./MovieCast/MovieCast.jsx"));
const MovieReviews = lazy(() => import("./MovieReviews/MovieReviews.jsx"));
const NotFoundPage = lazy(() =>
  import("../pages/NotFoundPage/NotFoundPage.jsx")
);

function App() {
  const [movies, setMovies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const {data} = await getTrendingMovies();
        setMovies([...data.results])
      } catch {
        console.log('error')
      }
    };

    if (location.pathname === '/') {
      fetchTrendingMovies()
    }

  }, [location]);


  return (
    <>
      <Navigation />
      <Container>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage movies={movies} />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      </Container>
    </>
  );
}

export default App;

// import HomePage from "../pages/HomePage/HomePage.jsx";
// import MoviesPage from "../pages/MoviesPage/MoviesPage.jsx";
// import MovieDetailsPage from "../pages/MovieDetailsPage/MovieDetailsPage.jsx";
// import MovieCast from "./MovieCast/MovieCast.jsx";
// import MovieReviews from "./MovieReviews/MovieReviews.jsx";
// import NotFoundPage from "../pages/NotFoundPage/NotFoundPage.jsx";
