import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRoutes from "./Routes/UserRoutes.js";
import moviesRoutes from "./Routes/MoviesRoutes.js";
import categoriesRoutes from "./Routes/CategoriesRoutes.js";
import { notHadled } from "./middlewares/errorMiddleware.js";
import uploadFile from "./Controllers/UploadFile.js";
import path from "path";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
// connect to mongodb
connectDB();

// main route
app.get("/", (req, res) => { res.send("API is running") });

// other routes
app.use("/api/users", userRoutes);
app.use("/api/movies", moviesRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/upload", uploadFile);
// error middleware
app.use(notHadled);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost/${PORT}`);
});
