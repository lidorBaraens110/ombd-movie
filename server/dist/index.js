"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.popularMoviesData = exports.redisClient = void 0;
const express_1 = __importDefault(require("express"));
const movie_service_1 = __importDefault(require("./services/movie.service"));
const movie_rout_1 = __importDefault(require("./routes/movie.rout"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const redis = __importStar(require("redis"));
dotenv_1.default.config();
exports.redisClient = redis.createClient();
exports.redisClient.on('error', (err) => console.log('Redis Client Error', err));
exports.redisClient.connect();
const port = process.env.PORT || 5000;
const app = (0, express_1.default)();
const movieList = ['the avengers', 'the godfather', 'the dark knight', 'The Shawshank Redemption', 'the good the bad and the ugly', 'titanic', 'the Pianist', 'fight club', 'pretty woman', 'notting hill'];
exports.popularMoviesData = movie_service_1.default.getInitialPopularMovies(movieList);
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api', movie_rout_1.default);
app.listen(port, () => console.log('server running on port ' + port));
