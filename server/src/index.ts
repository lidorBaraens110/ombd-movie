import express,{Application,Request,Response,NextFunction} from 'express';
import  service  from './services/movie.service';
import routes from './routes/movie.rout';
import dotenv from 'dotenv';
import cors from 'cors';
import * as redis from 'redis';

dotenv.config();

export const redisClient =  redis.createClient({
    url: 'redis://redis-17516.c9.us-east-1-2.ec2.cloud.redislabs.com:17516/',
    password: 'L5VbcxzFzsReXoRSP2X2UBRvr3TcTVYD'
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.connect();


const port = process.env.PORT || 4000;

const app:Application=express();

const movieList=['the avengers','the godfather','the dark knight','The Shawshank Redemption','the good the bad and the ugly','titanic','the Pianist','fight club','pretty woman','notting hill']
export const popularMoviesData=service.getInitialPopularMovies(movieList)
app.use(express.json());
app.use(cors());

app.use('/api', routes);


app.listen(port,()=>console.log('server running on port '+port))
