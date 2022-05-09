import { useEffect, useState } from "react";
import ModalMovie from "./modals/modal";
import "./App.css";
import { IMovie } from "./interface/movie.interface";
import MovieList from "./component/movieList/movieList";
import { getData } from "./api";
import Search from "./component/search/search";
import {Spinner} from 'reactstrap';

function App() {
  const [open, setOpen] = useState(false);
  const [modalMovie, setModalMovie] = useState<IMovie>();
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [popularMovie, setPopularMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData("/");
      setPopularMovies(data);
      setMovies(data);
    };
    fetchData();
  }, []);

  const toggle = (i?: number) => {
    if (i || i === 0) {
      setModalMovie(movies[i]);
    } else {
      setModalMovie(undefined);
    }
    setOpen((pre) => !pre);
  };

  const handleEmptyValue = () => {
    setMovies(popularMovie);
  };

  return (
    <div className="App">
      <ModalMovie modalMovie={modalMovie} open={open} toggle={toggle} />
      <Search
        setMovies={(movie: IMovie) => setMovies([movie])}
        setError={(err: string) => setError(err)}
        handleEmptyValue={handleEmptyValue}
        setLoading={(val) => setLoading(val)}
      />
      {error ? (
        <div className="error">
          <span>{error}</span>
        </div>
      ) : loading ? (
        <div className="error">
         <Spinner/>
        </div>
      ) : (
        <div className="grid">
          <MovieList list={movies} toggle={toggle} />
        </div>
      )}
    </div>
  );
}

export default App;
