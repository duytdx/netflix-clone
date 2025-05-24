import express from "express";
import { importMovies, getMovies, getTopRatedMovies, getRandomMovies, getMovieById, createMovieReview, updateMovie, deleteMovie, deleteAllMovies, createMovie } from "../Controllers/MoviesController.js";
import { protect, admin } from "../middlewares/Auth.js";

const router = express.Router();

//********* PUBLIC ROUTES *********
router.post("/import", importMovies);
router.get("/", getMovies);
router.get("/rated/top", getTopRatedMovies);
router.get("/random/all", getRandomMovies);
router.get("/:id", getMovieById);


//********* PRIVATE ROUTES *********
router.post("/:id/reviews", protect, createMovieReview);

//********* ADMIN ROUTES *********
router.put("/:id", protect, admin, updateMovie);
router.delete("/:id", protect, admin, deleteMovie);
router.delete("/", protect, admin, deleteAllMovies);
router.post("/", protect, admin, createMovie);

export default router;
