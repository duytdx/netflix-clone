import React from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegCalendarAlt, FaRegClock } from "react-icons/fa";

function Movie({ movie }) {
  return (
    <div className="border border-border p-1 hover:scale-95 transition relative rounded-lg overflow-hidden group">
      <Link to={`/movies/${movie?.name}`} className="w-full block">
        <img
          src={`/images/movies/${movie?.image}`}
          alt={movie?.name}
          className="w-full h-64 object-cover rounded-lg transition duration-300 group-hover:opacity-90"
        />
      </Link>
      {/* Movie Rating */}
      <div className="absolute flex-center gap-2 top-2 right-2 bg-main bg-opacity-60 text-white px-2 py-1 rounded">
        <span className="text-star">★</span>
        <span className="font-semibold">{movie?.rate || "N/A"}</span>
      </div>
      {/* Movie Info */}
      <div className="absolute flex flex-col gap-2 bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent pt-16 pb-4 px-4 transition duration-300 group-hover:bg-opacity-90">
        <h3 className="font-semibold text-white text-lg truncate">{movie?.name}</h3>
        <div className="flex items-center gap-3 text-white text-sm">
          <span className="flex items-center gap-2">
            <FaRegCalendarAlt className="text-subMain" />
            {movie?.year || "N/A"}
          </span>
          <span className="flex items-center gap-2">
            <FaRegClock className="text-subMain" />
            {movie?.time || "N/A"}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <Link 
            to={`/movies/${movie?.name}`}
            className="bg-subMain hover:bg-main transition text-white px-4 py-1 rounded text-sm"
          >
            Watch Now
          </Link>
          <button 
            className="w-8 h-8 text-sm flex-center transition hover:bg-subMain border-2 border-subMain rounded-full bg-main text-white"
            title="Add to favorites"
          >
            <FaHeart />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Movie;