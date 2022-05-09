"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const movie_controller_1 = require("../controllers/movie.controller");
const router = (0, express_1.Router)();
router.get('/name/:name', movie_controller_1.getMovieByName);
router.get('/:id', movie_controller_1.getMovieById);
exports.default = router;
