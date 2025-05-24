import React from "react";
import FlexMovieItems from "../FlexMovieItems";
import { FaPlay, FaShareAlt, FaDownload } from "react-icons/fa";
import { Link } from "react-router-dom";

function MovieInfo({ movie, setModalOpen }) {
  return (
    <div className="w-full xl:h-screen relative text-white">
      {/* Background Image with Gradient Overlay */}
      <div className="relative hidden xl:block h-full">
        <img
          src={`/images/movies/${movie?.image}`}
          alt={movie.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/60"></div>
      </div>

      {/* Content */}
      <div className="xl:absolute top-0 left-0 right-0 bottom-0 xl:bg-transparent bg-dry">
        <div className="container px-4 mx-auto 2xl:px-32 xl:grid grid-cols-12 items-center py-10 lg:py-20 gap-8">
          {/* Movie Poster */}
          <div className="xl:col-span-3 w-full h-[500px] border-2 border-red-500 rounded-xl overflow-hidden shadow-xl shadow-red-500/20">
            <img
              src={`/images/movies/${movie?.titleImage}`}
              alt={movie.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Movie Details */}
          <div className="xl:col-span-9 md:grid grid-cols-12 gap-6 items-start mt-8 xl:mt-0">
            <div className="col-span-8 flex flex-col gap-8">
              {/* Title and Badge */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="px-4 py-1.5 bg-red-500 rounded-full text-xs font-semibold uppercase tracking-wider">
                    HD 4K
                  </div>
                  <div className="px-4 py-1.5 bg-blue-600 rounded-full text-xs font-semibold uppercase tracking-wider">
                    {movie.category}
                  </div>
                </div>
                <h1 className="xl:text-5xl text-3xl font-bold leading-tight capitalize">
                  {movie?.name}
                </h1>
              </div>

              {/* Movie Metadata */}
              <div className="flex items-center gap-6 flex-wrap font-medium text-gray-300">
                <FlexMovieItems movie={movie && movie} />
              </div>

              {/* Description */}
              <p className="text-gray-300 text-base leading-7 font-medium">
                {movie.desc}
              </p>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-6 text-sm">
                <div className="flex flex-col gap-2">
                  <span className="text-gray-400">Director</span>
                  <span className="font-semibold">{movie.director || "Unknown"}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-gray-400">Language</span>
                  <span className="font-semibold">{movie.language}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-gray-400">Release Year</span>
                  <span className="font-semibold">{movie.year}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-gray-400">Duration</span>
                  <span className="font-semibold">{movie.time}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 flex-wrap">
                <Link
                  to={`/watch/${movie?.name}`}
                  className="bg-red-500 py-4 hover:bg-red-800 transition px-8 py-3 rounded-full flex items-center gap-3 font-semibold"
                >
                  <FaPlay className="w-4 h-4" />
                  Watch Now
                </Link>
                <button className="bg-transparent border-2 border-white/20 hover:border-white transition px-8 py-3 rounded-full flex items-center gap-3 font-semibold">
                  <FaDownload className="w-4 h-4" />
                  Download
                </button>
                <button onClick={()=> setModalOpen(true)} className="bg-gray-800 hover:bg-gray-700 transition p-3 rounded-full flex items-center">
                  <FaShareAlt className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Right Side - Rating Card */}
            <div className="col-span-4 mt-8 md:mt-0">
              <div className="bg-main border border-gray-800 rounded-xl p-6 shadow-lg">
                <div className="flex flex-col items-center justify-center">
                  <div className="w-24 h-24 rounded-full border-4 border-red-500 flex items-center justify-center mb-4">
                    <span className="text-3xl font-bold">{movie.rate}</span>
                  </div>
                  <h3 className="font-medium mb-2">User Rating</h3>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg 
                        key={star}
                        className={`w-5 h-5 ${star <= Math.floor(movie.rate / 2) ? "text-yellow-500" : "text-gray-600"}`}
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>

                <div className="mt-8 border-t border-gray-800 pt-6">
                  <h3 className="font-medium mb-4">Available on:</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {["Netflix", "Prime", "Disney+"].map((platform) => (
                      <div key={platform} className="bg-gray-800 p-2 rounded-lg flex items-center justify-center">
                        <span className="text-sm">{platform}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieInfo;