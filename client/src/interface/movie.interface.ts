export interface IMovie {
    Title:string;
    Year:number;
    Rated?: "R";
    Released: string;
    Runtime:string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string,
    Poster: string;
    imdbRating: number;
  }

export interface IModal{
  open:boolean;
  modalMovie:IMovie|undefined;
  toggle:()=>void;
}

export interface IToggle{
    toggle:()=>void
}

export interface ISearch {
  setMovies: (movie: IMovie) => void;
  setLoading: (flag:boolean) => void;
  setError: (err: string) => void;
  handleEmptyValue: () => void;
}

export interface IMovieList{
  list:IMovie[]
  toggle:(i:number)=>void;
}

export interface IMovieCom{
  movie?:IMovie;
  toggle?:()=>void;
}