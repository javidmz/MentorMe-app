import { useRef } from "react";
import "../style/searchbar.scss";
import SearchLogo from "../assets/icon-search.svg";

const SearchBar = ({ setSearch }) => {
  const searchRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(searchRef.current.value);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <img src={SearchLogo} alt="search" />
      <input
        type="text"
        placeholder="Search for Questions"
        id="search"
        ref={searchRef}
      />
      <button type="submit" id="button" onClick={handleSubmit}>
        Search
      </button>
    </form>
  );
};

export default SearchBar;
