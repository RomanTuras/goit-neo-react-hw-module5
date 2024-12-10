import axios from "axios";

const API_READ_ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZDk1MDI3M2ZmMzY5NWJkY2UyMTlmYTZiNDc0MWJkZSIsIm5iZiI6MTczMzY1NDQ4OS4wNzksInN1YiI6IjY3NTU3N2Q5MjM3ODQ5NzY3NTc1NjE4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z1zuqOrCEvxQI7cq39NIfe4PolLReH8hnc95zaxg49M";

const pathToImg = "https://image.tmdb.org/t/p/w500/";
const pathToDefaultImg = 'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

instance.defaults.headers.common[
  "Authorization"
] = `Bearer ${API_READ_ACCESS_TOKEN}`;
instance.defaults.headers.common["accept"] = "application/json";

const options = {
  params: {
    language: "en-EN",
    include_adult: false,
  },
};

export const getTrendingMovies = async () => {
  return await instance.get("trending/movie/day", options);
};

export const getMovieDetails = async (id) => {
  return await instance.get("movie/" + id, options);
};

export const getMovieCast = async (id) => {
  return await instance.get("movie/" + id + "/credits", options);
};

export const getMovieReviews = async (id) => {
  return await instance.get("movie/" + id + "/reviews", options);
};

export const searchMovies = async (query) => {
  options.params.query = query;
  return await instance.get("search/movie", options);
};

export const getMoviePosterPath = (img) => img ? pathToImg + img : pathToDefaultImg;
