
   
import { Router } from 'express';
import { getMovieByName, getPopularMovies, serachMovie } from '../controllers/movie.controller';

const router = Router();
router.get('/name/:name',getMovieByName)
router.get('/:name', serachMovie)
router.get('/',getPopularMovies)

export default router;