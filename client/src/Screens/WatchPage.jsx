import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MovieData } from "../Data/MovieData";
import Layout from "../Layout/Layout";
import { BiArrowBack } from "react-icons/bi";
import { FaCloudDownloadAlt, FaHeart, FaPlay } from "react-icons/fa";

function WatchPage() {
  let { id } = useParams();
  const movie = MovieData.find((movie) => movie.name === id);
  const [play, setPlay] = useState(false);
  return (
    <Layout>
      <div className="container mx-auto bg-dry p-6 mb-12">
        <div className="flex-between flex-wrap mb-6 gap-2 bg-main rounded border border-gray-800 p-6">
          <Link
            to={`/movies/${movie.name}`}
            className="md:text-xl text-sm flex gap-3 items-center font-bold text-dryGray"
          >
            <BiArrowBack /> {movie?.name}
          </Link>
          <div className="flex-between sm:w-auto w-full gap-5">
            <button className="bg-white hover:text-subMain transitions text-main rounded px-4 py-3 text-sm">
              <FaHeart />
            </button>
            <button className="bg-subMain hover:text-main transitions text-white rounded px-8 py-3 text-sm flex items-center gap-2">
              <FaCloudDownloadAlt />
              Download
            </button>
          </div>
        </div>

        {/* Watch video */}
        {play ? (
          <video controls autoPlay={play} className="w-full h-screen rounded">
            <source
              src="/images/movie.mp4"
              type="video/mp4"
              title={movie?.name}
            />
          </video>
        ) : (
          <div className="w-full h-screen rounded-lg overflow-hidden relative">
            <div className="absolute top-0 left-0 bottom-0 right-0 bg-main opacity-30 flex items-center justify-center">
              <button
                onClick={() => setPlay(true)}
                className="bg-white text-red-500 flex items-center justify-center border border-red-500 rounded-full w-16 h-16 hover:scale-110 transition"
              >
                <FaPlay className="text-xl ml-1" />
              </button>
            </div>
            <img
              src={
                movie?.image
                  ? `/images/movies/${movie.image}`
                  : "images/user.png"
              }
              alt={movie?.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
    </Layout>
  );
}

export default WatchPage;
