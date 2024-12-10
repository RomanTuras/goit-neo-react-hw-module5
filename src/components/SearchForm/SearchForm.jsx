import { useNavigate } from "react-router-dom";
import css from './SearchForm.module.css';

const SearchForm = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const { _, search } = form.elements;
    const query = search.value.trim().toLowerCase();
    if (query.length > 1) {
      navigate("/movies?query=" + query, { replace: true });
    }

    form.reset();
  };

  return (
    <form onSubmit={handleSubmit} className={css.formSearch}>
      <input
        className={css.search}
        name="search"
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search movies"
      />
      <button type="submit" className={css.submit}>
        GO!
      </button>
    </form>
  );
};

export default SearchForm;
