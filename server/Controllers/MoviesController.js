import asyncHandler from "express-async-handler";
import Movie from "../Models/MoviesModels.js";
import { MovieData } from "../Data/MovieData.js";

// ************* PUBLIC CONTROLLERS *************
// @desc    import movies
// @route   POST /api/movies/import
// @access  Public


const importMovies = asyncHandler(async (req, res) => {
    await Movie.deleteMany({});
    const movies = await Movie.insertMany(MovieData);
    res.status(201).json(movies);
})

// @desc    get all movies
// @route   GET /api/movies
// @access  Public

const getMovies = asyncHandler(async (req, res) => {
    try {
        // filter movies by category, time, language, rate, year and search
        const { category, time, language, rate, year, search } = req.query;
        let query = {
            ...(category && { category }),
            ...(time && { time }),
            ...(language && { language }),
            ...(rate && { rate }),
            ...(year && { year }),
            ...(search && { name: { $regex: search, $options: "i" } })
        }

        // load more movies functionality
        const page = Number(req.query.pageNumber) || 1; // if pageNumber is not provided, default to 1
        const limit = 2; // 2 movies per page
        const skip = (page - 1) * limit; // skip 2 movies per page

        // find movies based on query with pagination
        const movies = await Movie.find(query)
            .sort({ createdAt: -1 }) // sort by createdAt in descending order
            .limit(limit)
            .skip(skip);

        // get total number of movies
        const count = await Movie.countDocuments(query);

        // check if movies exist
        if (!movies) {
            res.status(404);
            throw new Error("No movies found");
        }

        // send response with movies and total number of movies
        res.json({
            movies,
            page,
            pages: Math.ceil(count / limit), // total number of pages
            totalMovies: count
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

// @desc    get movie by id
// @route   GET /api/movies/:id
// @access  Public

const getMovieById = asyncHandler(async (req, res) => {
    try {
        // find movie by id in database
        const movie = await Movie.findById(req.params.id);
        // if the movie if found send it to client
        if (movie) {
            res.json(movie);
        }
        // if the movie is not found send 404 error
        else {
            res.status(404);
            throw new Error("Movie not found");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

// @desc    get top rated movies
// @route   GET /api/movies/rated/top
// @access  Public

const getTopRatedMovies = asyncHandler(async (req, res) => {
    try {
        // find top rated movies
        const movies = await Movie.find({}).sort({ rate: -1 });
        // send top rated movies to client
        res.json(movies);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

// @desc get random movies
// @route GET /api/movies/random/all
// @access Public

const getRandomMovies = asyncHandler(async (req, res) => {
    try {
        // find random movies using aggregation pipeline
        const movies = await Movie.aggregate([
            { $sample: { size: 8 } }
        ]);
        // send random movies to client
        res.json(movies);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

// @desc create review movie
// @route POST /api/movies/:id/reviews
// @access Private

const createMovieReview = asyncHandler(async (req, res) => {
    try {
        const { rating, comment } = req.body;

        // validate rating
        if (!rating || isNaN(rating)) {
            res.status(400);
            throw new Error("Please provide a valid rating");
        }

        // find movie by id in database
        const movie = await Movie.findById(req.params.id);
        if (movie) {
            // check if user already reviewed the movie
            const alreadyReviewed = movie.reviews.find(review => review.userId.toString() === req.user._id.toString());
            // if user already reviewed the movie, send 400 error
            if (alreadyReviewed) {
                res.status(400);
                throw new Error("Movie already reviewed");
            }
            // else create review
            else {
                // create review
                const review = {
                    userName: req.user.fullName || req.user.name || 'Anonymous',
                    userId: req.user._id,
                    userImage: req.user.image || '',
                    rating: Number(rating),
                    comment: comment || ''
                }
                // add review to movie
                movie.reviews.push(review);
                // increment the number of reviews
                movie.numReviews = movie.reviews.length;
                // calculate the new rating
                const totalRating = movie.reviews.reduce((acc, item) => acc + Number(item.rating), 0);
                movie.rate = totalRating / movie.reviews.length;
                // save movie
                await movie.save();
                // send response to client
                res.status(201).json({ message: "Review added successfully" });
            }
        }
        // if movie is not found, send 404 error
        else {
            res.status(404);
            throw new Error("Movie not found");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// ************* ADMIN CONTROLLERS *************
// @desc    update movie
// @route   PUT /api/movies/:id
// @access  Private

const updateMovie = asyncHandler(async (req, res) => {
    try {
        // get data from request body
        const { name, desc, image, titleImage, category, language, year, time, video, rate, numberOfReviews, casts } = req.body;
        // find movie by id in database
        const movie = await Movie.findById(req.params.id);
        if (movie) {
            // update movie
            movie.name = name || movie.name;
            movie.desc = desc || movie.desc;
            movie.image = image || movie.image;
            movie.titleImage = titleImage || movie.titleImage;
            movie.category = category || movie.category;
            movie.language = language || movie.language;
            movie.year = year || movie.year;
            movie.time = time || movie.time;
            movie.video = video || movie.video;
            movie.rate = rate || movie.rate;
            movie.numReviews = numberOfReviews || movie.numReviews;
            movie.casts = casts || movie.casts;
            // save movie
            const updatedMovie = await movie.save();
            // send response to client
            res.status(201).json(updatedMovie);
        }
        // if movie is not found, send 404 error
        else {
            res.status(404);
            throw new Error("Movie not found");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

// @desc    delete movie
// @route   DELETE /api/movies/:id
// @access  Private

const deleteMovie = asyncHandler(async (req, res) => {
    try {
        // find movie by id in database
        const movie = await Movie.findById(req.params.id);
        if (movie) {
            // delete movie
            await movie.deleteOne();
            // send response to client
            res.status(200).json({ message: "Movie deleted successfully" });
        }
        // if movie is not found, send 404 error
        else {
            res.status(404);
            throw new Error("Movie not found");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

// @desc    delete all movies
// @route   DELETE /api/movies
// @access  Private

const deleteAllMovies = asyncHandler(async (req, res) => {
    try {
        // delete all movies
        await Movie.deleteMany({});
        // send response to client
        res.json({ message: "All movies deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

// @desc    create movie
// @route   POST /api/movies
// @access  Private

const createMovie = asyncHandler(async (req, res) => {
    try {
        // get data from request body
        const { name, desc, image, titleImage, category, language, year, time, video, rate, numberOfReviews, casts } = req.body;
        // create movie
        const movie = new Movie({
            name,
            desc,
            image,
            titleImage,
            category,
            language,
            year,
            time,
            video,
            rate,
            numberOfReviews,
            casts,
            userId: req.user._id
        })
        // save movie in database
        if (movie) {
            const createdMovie = await movie.save();
            // send response to client
            res.status(201).json(createdMovie);
        }
        // if movie is not found, send 400 error
        else {
            res.status(400);
            throw new Error("Invalid movie data");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

export { importMovies, getMovies, getMovieById, getTopRatedMovies, getRandomMovies, createMovieReview, updateMovie, deleteMovie, deleteAllMovies, createMovie };




