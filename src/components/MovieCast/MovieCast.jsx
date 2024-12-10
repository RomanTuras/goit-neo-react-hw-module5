import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMovieCast, getMoviePosterPath } from "../../api/movies.js";
import css from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchMovieCast = async (id) => {
      try {
        const { data } = await getMovieCast(id);
        // console.dir(data.cast);
        setCast(data.cast);
      } catch {
        console.log("error");
      }
    };
    if (location.pathname.includes("cast")) {
      fetchMovieCast(movieId);
    }
  }, [location, movieId]);

  return (
    <ul className={css.cast}>
      {cast.map((actor) => {
        return (
          <li key={actor.id} className={css.castCard}>
            <img
              className={css.actorImg}
              src={getMoviePosterPath(actor.profile_path)}
              // width="150px"
              alt={actor.name}
            />
            <div className={css.actorInfo}>
              <p>{actor.name}</p>
              <p>Character{actor.character}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default MovieCast;
