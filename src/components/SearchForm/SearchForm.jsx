import { useState } from "react";
import css from "./SearchForm.module.css";

const SearchForm = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <form onSubmit={handleSubmit} className={css.formSearch}>
      <input
        className={css.search}
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search movies"
      />
      <button type="submit" className={css.submit}>
        GO!
      </button>
    </form>
  );
};

export default SearchForm;
