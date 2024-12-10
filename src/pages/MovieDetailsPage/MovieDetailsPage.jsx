import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Suspense } from "react";
import { Link, Outlet } from "react-router-dom";
import { getMovieDetails, getMoviePosterPath } from "../../api/movies.js";
import BackLink from "../../components/BackLink/BackLink.jsx";
import css from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const [movieDetail, setMovieDetail] = useState([]);
  const location = useLocation();
  const backLinkHref = useRef(location.state ?? "/movies");
  const { movieId } = useParams();

  useEffect(() => {
    const fetchMovieDetails = async (id) => {
      try {
        const { data } = await getMovieDetails(id);
        setMovieDetail(data);
      } catch {
        console.log("error");
      }
    };
    if (location.pathname.includes("/movies/") && movieId) {
      fetchMovieDetails(movieId);
    }
  }, [location, movieId]);

  return (
    <div>
      <BackLink to={backLinkHref}>Go back</BackLink>
      <div className={css.content}>
        <img className={css.poster} src={getMoviePosterPath(movieDetail.poster_path)} alt="" />
        <div>
          <h3>{movieDetail.title}</h3>
          <p>Vote average: {movieDetail.vote_average}</p>
          <h4>Overview</h4>
          <p>{movieDetail.overview}</p>
          <h4>Genres</h4>
          {movieDetail.genres && movieDetail.genres.map((g) => (
            <span key={g.id}>{g.name}</span>
          ))}
          <h4 className={css.infoTitle}>Additional information</h4>
          <ul className={css.info}>
            <li>
              <Link to="cast">Cast</Link>
            </li>
            <li>
              <Link to="reviews">Reviews</Link>
            </li>
          </ul>
          <Suspense fallback={<div>Loading additional info...</div>}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
