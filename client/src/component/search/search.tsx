import { ChangeEvent, FC,useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { getData } from "../../api";
import useFetch from "../../hooks/useFetch";
import {  ISearch } from "../../interface/movie.interface";
import "./search.css";

const Search: FC<ISearch> = ({ setMovies, setError, handleEmptyValue,setLoading}) => {
  const [search, setSearch] = useState<string>("");
  const [display, setDisplay] = useState(false);
  const {searchResult} =useFetch(search,handleEmptyValue)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearch(val);
  };

  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchMovie(search);
  };

  const findMovieDetail = (res: string) => {
    setSearch(res);
    fetchMovie(res);
  };

  const fetchMovie = async (res: string) => {
    setLoading(true)
    setDisplay(false);
    const data = await getData(`/name/${res}`);
    if (data?.Error) {
      setError(data.Error);
      setLoading(false)
    } else {
      setError("");
      setMovies(data);
      setLoading(false)
    }
  };

  const handleInputClick = () => {
    if (searchResult !== []) setDisplay(true);
  };

  return (
    <div
      className="heading"
      onBlur={() => {
        setTimeout(() => {
          setDisplay(false);
        }, 200);
      }}
    >
      <form onSubmit={onSearch}>
        <button type="submit">
          <AiOutlineSearch size={"25px"} color={"white"} />
        </button>
        <input
          onClick={handleInputClick}
          placeholder="search"
          type="text"
          value={search}
          onChange={handleChange}
        />
      </form>
      <div className="wrap-autocomplete">
        {display && searchResult.length>0&&
          searchResult.map((res, i) => {
            return (
              <div
                key={i}
                onClick={() => findMovieDetail(res)}
                className="suggestion"
              >
                {res}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Search;
