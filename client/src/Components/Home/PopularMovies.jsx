import React from "react";
import Titles from "../Titles";
import { BsCollectionFill } from "react-icons/bs";
import { MovieData } from "../../Data/MovieData";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

function PopularMovies() {
  return (
    <div className="my-16">
      <Titles title="Popular Movies" Icon={BsCollectionFill} />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {MovieData.slice(0, 8).map((movie, index) => (
          <Link
            to={`/movies/${movie.name}`}
            key={index}
            className="relative overflow-hidden rounded-lg shadow-md group border border-gray-700"
          >
            {/* Movie Image */}
            <img
              src={`/images/movies/${movie.image}`}
              alt={movie.title}
              className="w-full h-[250px] object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Movie Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <h1 className="text-white text-lg font-bold capitalize text-center">
                {movie.name}
              </h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PopularMovies;
