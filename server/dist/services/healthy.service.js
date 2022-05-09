"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const moviesInstance = axios_1.default.create({
    baseURL: 'http://www.omdbapi.com'
});
const apiKey = 'e885a14e';
const getMovieById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield moviesInstance.get(`/?i=${id}&apikey=${apiKey}`);
        console.log('data', response.data);
        return response.data;
    }
    catch (err) {
        console.log(err);
        return 'errrr';
        throw new Error('untorizationn');
    }
});
const getMovieByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield moviesInstance.get(`/?s=${name}&apikey=${apiKey}`);
        console.log(res.data);
        return res.data;
    }
    catch (err) {
        return err;
    }
});
const services = {
    getMovieById,
    getMovieByName
};
exports.default = services;
