import {Request,Response} from 'express';
import service from '../services/movie.service';

const getPopularMovies=async (req:Request,res:Response)=>{
    const response=await service.getPopularMovies();
    res.json(response)
}

const getMovieByName = async (req:Request, res:Response) => {
    const {name}=req.params;
    const response=await service.getMovieByName(name)
    return res.json(response)
}


const serachMovie =async(req:Request,res:Response)=>{
    const {name}=req.params;
    const response=await service.serachMovie(name)
    return res.json(response)
}

export {
    getPopularMovies,
    serachMovie,
    getMovieByName
}