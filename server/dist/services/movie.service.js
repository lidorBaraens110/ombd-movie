"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const index_1 = require("../index");
const index_2 = require("../index");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const moviesInstance = axios_1.default.create({
    baseURL: "http://www.omdbapi.com",
});
// "e885a14e"
const apiKey = process.env.APIKEY;
console.log('apkeyi', apiKey);
const defaultExperation = 3600;
const getMovieByName = async (name) => {
    const data = await getOrSetCache(`searchList?t=${name}`, async () => {
        try {
            const response = await moviesInstance.get(`/?t=${name}&apikey=${apiKey}&type=movie`);
            return response.data;
        }
        catch (err) {
            return "errrr";
        }
    });
    return data;
};
const getInitialPopularMovies = (movies) => {
    return Promise.all(movies.map(async (movie) => {
        return await getMovieByName(movie);
    }));
};
const getPopularMovies = () => {
    return index_1.popularMoviesData;
};
const serachMovie = async (name) => {
    const data = await getOrSetCache(`searchList?s=${name}`, async () => {
        try {
            const response = await moviesInstance.get(`/?s=${name}&page=1-3&apikey=${apiKey}&type=movie`);
            if (response.data.Response) {
                if (response.data.Search) {
                    const filterdList = removeDuplicate(response.data.Search);
                    response.data.Search = filterdList;
                }
            }
            return response.data;
        }
        catch (err) {
            return err;
        }
    });
    return data;
};
function removeDuplicate(data) {
    const namesList = data.map((res) => res.Title);
    return namesList.filter((title, index, array) => {
        return array.indexOf(title) === index;
    });
}
function getOrSetCache(key, cb) {
    return new Promise(async (res, rej) => {
        const data = await index_2.redisClient.get(key);
        if (data) {
            return res(JSON.parse(data));
        }
        const freshData = await cb();
        await index_2.redisClient.setEx(key, defaultExperation, JSON.stringify(freshData));
        res(freshData);
    });
}
const services = {
    getPopularMovies,
    serachMovie,
    getMovieByName,
    getInitialPopularMovies,
};
exports.default = services;
