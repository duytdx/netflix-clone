import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Titles from "../Titles";
import {
  BsBookmarkStarFill,
  BsCaretLeftFill,
  BsCaretRightFill,
} from "react-icons/bs";
import { Data } from "../../Data/TopRatedImg";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import Rating from "../Stars";

function TopRated() {
  const [nextEl, setNextEl] = useState(null);
  const [prevEl, setPrevEl] = useState(null);
  const swiperRef = useRef(null);
  const movies = Data;

  useEffect(() => {
    if (swiperRef.current?.swiper && movies.length >= 5) {
      swiperRef.current.swiper.update();
    }
  }, [movies]);

  if (movies.length < 5) return null;

  const className =
    "hover:bg-subMain transitions bg-white bg-opacity-30 border border-subMain text-subMain hover:text-white rounded-full w-10 h-10 flex items-center justify-center";

  return (
    <div className="my-16">
      <Titles title="Top Rated" Icon={BsBookmarkStarFill} />
      <div className="mt-10 relative">
        <Swiper
          ref={swiperRef}
          navigation={{ nextEl, prevEl }}
          slidesPerView={4}
          spaceBetween={40}
          autoplay={true}
          speed={1000}
          loop={true}
          modules={[Navigation, Autoplay]}
          observeParents={true}
          observer={true}
        >
          {movies.map((movie, index) => (
            <SwiperSlide key={index}>
              <div className="p-4 h-rate border border-border bg-dry rounded-lg overflow-hidden group">
                <img
                  src={`/images/movies/${movie.titleImage}`}
                  alt={movie.name}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="px-4 flex-col gap-6 text-center absolute bg-black bg-opacity-80 top-0 left-0 right-0 bottom-0 opacity-0 group-hover:opacity-80 transition-opacity duration-300">
                  <div className="flex flex-col items-center justify-center h-full gap-6">
                    <button className="w-12 h-12 flex items-center justify-center transition hover:bg-subMain rounded-full bg-white bg-opacity-30 text-white">
                      <FaHeart className="w-6 h-6" />
                    </button>
                    <Link
                      to={`/movie/${movie.name}`}
                      className="font-semibold text-xl truncate line-clamp-2 hover:text-subMain transitions"
                    >
                      {movie.name}
                    </Link>
                    <div className="flex gap-2 items-center">
                      <Rating value={movie.rate} />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="w-full flex justify-center items-center gap-8 pt-10">
          <button
            className={`${className} hover:scale-105`}
            ref={(node) => setPrevEl(node)}
          >
            <BsCaretLeftFill className="w-5 h-5" />
          </button>
          <button
            className={`${className} hover:scale-105`}
            ref={(node) => setNextEl(node)}
          >
            <BsCaretRightFill className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TopRated;
