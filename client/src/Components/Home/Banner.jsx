import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { MovieData } from "../../Data/MovieData";
import { FaHeart, FaRegCalendarAlt, FaRegClock, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

function Banner() {
  const swiperRef = useRef(null);
  const movies = MovieData.slice(0, 5);

  useEffect(() => {
    if (swiperRef.current?.swiper && movies.length >= 2) {
      swiperRef.current.swiper.update();
    }
  }, [movies]);

  if (movies.length < 2) return null;

  return (
    <div className="relative w-full">
      <Swiper
        ref={swiperRef}
        spaceBetween={0}
        slidesPerView={1}
        modules={[Autoplay, EffectFade, Navigation]}
        effect="fade"
        navigation
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        className="w-full h-[500px] lg:h-[600px]"
        observer={true}
        observeParents={true}
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={index} className="relative overflow-hidden">
            {/* Background Image with Parallax Effect */}
            <div className="absolute inset-0 transform group-hover:scale-110 transition duration-1000">
              <img
                src={`/images/movies/${movie.image}`}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex items-center px-4 sm:px-8 lg:px-24">
              <div className="w-full lg:w-2/3 space-y-6">
                {/* Category & Rating */}
                <div className="flex items-center gap-4 text-white">
                  <span className="bg-subMain px-4 py-1 rounded text-sm font-medium">
                    {movie.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <FaStar className="text-star w-4 h-4" />
                    <span className="font-medium">{movie.rate}/10</span>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold capitalize">
                  {movie.name}
                </h1>

                {/* Movie Info */}
                <div className="flex items-center gap-4 text-white text-sm font-medium">
                  <span className="flex items-center gap-2">
                    <FaRegCalendarAlt className="text-subMain w-4 h-4" />
                    {movie.year}
                  </span>
                  <span className="flex items-center gap-2">
                    <FaRegClock className="text-subMain w-4 h-4" />
                    {movie.time}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-200 text-sm sm:text-base line-clamp-3">
                  {movie.desc || "No description available"}
                </p>

                {/* Buttons */}
                <div className="flex items-center gap-4">
                  <Link
                    to={`/movies/${movie.name}`}
                    className="bg-subMain hover:bg-main transition text-white px-8 py-3 rounded-full font-medium flex items-center gap-2"
                  >
                    Watch Now
                  </Link>
                  <button 
                    className="bg-white/20 hover:bg-subMain transition text-white w-12 h-12 flex-center rounded-full"
                    title="Add to favorites"
                  >
                    <FaHeart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Banner;
