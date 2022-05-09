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
exports.getMovieByName = exports.getMovieById = void 0;
const healthy_service_1 = __importDefault(require("../services/healthy.service"));
const getMovieById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const response = yield healthy_service_1.default.getMovieById(id);
    return res.json(response);
});
exports.getMovieById = getMovieById;
const getMovieByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    return res.json(yield healthy_service_1.default.getMovieByName(name));
});
exports.getMovieByName = getMovieByName;
