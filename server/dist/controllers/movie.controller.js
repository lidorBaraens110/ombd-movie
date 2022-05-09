"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMovieByName = exports.serachMovie = exports.getPopularMovies = void 0;
const movie_service_1 = __importDefault(require("../services/movie.service"));
const getPopularMovies = async (req, res) => {
    const response = await movie_service_1.default.getPopularMovies();
    res.json(response);
};
exports.getPopularMovies = getPopularMovies;
const getMovieByName = async (req, res) => {
    const { name } = req.params;
    const response = await movie_service_1.default.getMovieByName(name);
    return res.json(response);
};
exports.getMovieByName = getMovieByName;
const serachMovie = async (req, res) => {
    const { name } = req.params;
    const response = await movie_service_1.default.serachMovie(name);
    return res.json(response);
};
exports.serachMovie = serachMovie;
