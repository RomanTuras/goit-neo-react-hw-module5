import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMovieReviews } from "../../api/movies.js";
import css from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchMovieReviews = async (id) => {
      try {
        const { data } = await getMovieReviews(id);
        // console.dir(data.results);
        setReviews(data.results);
      } catch {
        console.log("error");
      }
    };
    if (location.pathname.includes("reviews")) {
      fetchMovieReviews(movieId);
    }
  }, [location, movieId]);

  return (
    <div className={css.reviews}>
      {reviews.map((review) => {
        return (
          <div className={css.review} key={review.id}>
            <h5 className={css.reviewAuthor}>{review.author}</h5>
            <p>{review.content}</p>
          </div>
        );
      })}
      {reviews.length === 0 && (
        <div>We don't have any reviews for this movie</div>
      )}
    </div>
  );
};

export default MovieReviews;
