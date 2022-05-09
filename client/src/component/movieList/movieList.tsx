import {FC}  from 'react';
import { IMovieList } from '../../interface/movie.interface';
import Movie from '../movie/movie';




const MovieList:FC<IMovieList>=({list,toggle})=>{
    return (
        <>
       {list.map((movie,i)=>{
           return <Movie key={i} movie={movie} toggle={()=>toggle(i)}/>
        })}
        </>
    )
}

export default MovieList