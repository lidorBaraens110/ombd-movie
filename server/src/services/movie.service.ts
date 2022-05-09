import axios from "axios";
import { popularMoviesData } from "../index";
import { redisClient } from "../index";
import dotenv from 'dotenv';
dotenv.config()
const moviesInstance = axios.create({
  baseURL: "http://www.omdbapi.com",
});
// "e885a14e"
const apiKey = process.env.APIKEY;
console.log('apkeyi',apiKey)
const defaultExperation = 3600;

const getMovieByName = async (name: string) => {
  const data = await getOrSetCache(`searchList?t=${name}`, async () => {
    try {
      const response = await moviesInstance.get(
        `/?t=${name}&apikey=${apiKey}&type=movie`
      );
      return response.data;
    } catch (err) {
      return "errrr";
    }
  });
  return data;
};

const getInitialPopularMovies = (movies: string[]) => {
  return Promise.all(
    movies.map(async (movie) => {
      return await getMovieByName(movie);
    })
  );
};

const getPopularMovies = () => {
  return popularMoviesData;
};

const serachMovie = async (name: string) => {
  const data = await getOrSetCache(`searchList?s=${name}`, async () => {
    try {
      const response = await moviesInstance.get(
        `/?s=${name}&page=1-3&apikey=${apiKey}&type=movie`
      );
      if (response.data.Response) {
        if (response.data.Search) {
            const filterdList=removeDuplicate(response.data.Search)
          response.data.Search = filterdList;
        }
      }
      return response.data
    } catch (err) {
      return err;
    }
  });
  return data;
};


function removeDuplicate(data:any[]){
    const namesList: string[] = data.map(
        (res: { Title: string }) => res.Title
      );
      return namesList.filter((title, index, array) => {
        return array.indexOf(title) === index;
      });

}
function getOrSetCache(key: string, cb: () => Promise<any>) {
  return new Promise(async (res, rej) => {
    const data = await redisClient.get(key);
    if (data) {
      return res(JSON.parse(data));
    }
    const freshData = await cb();
    await redisClient.setEx(key, defaultExperation, JSON.stringify(freshData));
    res(freshData);
  });
}

const services = {
  getPopularMovies,
  serachMovie,
  getMovieByName,
  getInitialPopularMovies,
};
export default services;
