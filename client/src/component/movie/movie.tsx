import { FC } from "react";
import { AiFillStar } from "react-icons/ai";
import { defaultImg } from "../../constant";
import {  IMovieCom } from "../../interface/movie.interface";
import './movie.style.css';

const Movie:FC<IMovieCom>=({movie,toggle})=>{
    return (
        <div onClick={toggle} className="card">
          <img src={movie?.Poster||defaultImg} alt="postar" />
          <div className="movie-detail">
            <div className="movie-detail-header">
            <h5>{movie?.Title}</h5>
            <div className="wrap-rating">
            <h5 className="rate">{movie?.imdbRating}</h5>
            <div className="wrap-star">
            <AiFillStar color="#f5c518" />
            </div>
            </div>
            </div>
          <span className="description">{movie?.Plot}</span>
            </div>
        </div>
    )
}

export default Movie;