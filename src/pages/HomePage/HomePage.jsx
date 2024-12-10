import MovieList from "../../components/MovieList/MovieList.jsx";

const HomePage = ({ movies }) => {
  return (
    <div>
      <h1>Trending today</h1>
      <hr />
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
