import React, { useState } from "react";
import { BsBookmarkStarFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { UsersData } from "../../Data/UsersData";

function MovieRates({ movie }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hoverRating, setHoverRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("latest");

  const itemsPerPage = 4;
  const totalPages = Math.ceil(UsersData.length / itemsPerPage);

  const sortedData = [...UsersData].sort((a, b) => {
    if (sortBy === "latest") return -1;
    if (sortBy === "oldest") return 1;
    if (sortBy === "highest") return (b.rating || 0) - (a.rating || 0);
    return 0;
  });

  const currentReviews = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const StarRater = () => (
    <div className="flex">
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          onClick={() => setRating(index + 1)}
          onMouseEnter={() => setHoverRating(index + 1)}
          onMouseLeave={() => setHoverRating(0)}
          className="cursor-pointer"
        >
          <FaStar
            className="text-3xl mr-1 transition-colors duration-200"
            color={index < (hoverRating || rating) ? "#E50914" : "#666"}
          />
        </span>
      ))}
      {rating > 0 && (
        <span className="ml-2 text-lg font-medium text-gray-300 self-center">
          {rating}/5
        </span>
      )}
    </div>
  );

  const StarDisplay = ({ value }) => (
    <div className="flex">
      {[...Array(5)].map((_, index) => (
        <FaStar
          key={index}
          className="text-xs mr-1"
          color={index < value ? "#E50914" : "#666"}
        />
      ))}
    </div>
  );

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="my-12 font-sans">
      {/* Title Header */}
      <div className="flex items-center gap-2 mb-8 border-l-4 border-red-600 pl-4">
        <span className="text-red-600">
          <BsBookmarkStarFill size={28} />
        </span>
        <h2 className="text-2xl font-bold text-white">Reviews</h2>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column */}
        <div className="lg:col-span-4 bg-gradient-to-b from-gray-900 to-black p-6 rounded-lg shadow-xl border border-gray-800">
          <h3 className="text-xl font-bold mb-4 text-white">Rate "{movie?.name}"</h3>
          <p className="text-sm text-gray-400 mb-6">
            Share your thoughts on this title. Your review will help other viewers decide what to watch.
          </p>
          <div className="mb-6">
            <label className="text-sm font-semibold text-gray-300 mb-3 block">
              Your Rating
            </label>
            <StarRater />
          </div>
          <div className="mt-8">
            <label className="text-sm font-semibold text-gray-300 mb-3 block">
              Your Review
            </label>
            <textarea
              className="w-full h-40 bg-gray-800 border border-gray-700 text-sm p-4 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition duration-200"
              placeholder="What did you think? (No spoilers, please!)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>
          <button className="w-full bg-red-600 hover:bg-red-700 transition duration-300 text-white py-3 rounded-md font-medium text-sm mt-6 flex items-center justify-center">
            <span>Post Review</span>
          </button>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white">Reviews ({UsersData.length})</h3>
            <div className="flex items-center bg-gray-800 rounded-md px-3 py-1">
              <span className="text-sm text-gray-300 mr-2">Sort by:</span>
              <select
                className="bg-transparent text-sm text-white focus:outline-none cursor-pointer"
                onChange={(e) => setSortBy(e.target.value)}
                value={sortBy}
              >
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
                <option value="highest">Highest Rating</option>
              </select>
            </div>
          </div>
          <div className="w-full flex flex-col gap-4 max-h-[650px] overflow-y-auto pr-2 custom-scrollbar">
            {currentReviews.map((user, index) => (
              <div
                key={index}
                className="flex flex-col w-full bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-gray-700 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <img
                      src={`/images/${user ? user.image : "user.png"}`}
                      alt={user?.name}
                      className="w-12 h-12 rounded-full object-cover border border-gray-700"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/images/user.png";
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                      <h2 className="text-lg font-semibold text-white">{user?.name}</h2>
                      <div className="flex items-center gap-2">
                        <StarDisplay value={user?.rating || 4} />
                        <span className="text-xs text-gray-400">
                          {user?.date || "2 days ago"}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm leading-6 text-gray-300">{user?.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <div className="flex gap-2">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className={`bg-gray-900 border border-gray-800 text-white py-2 px-4 rounded-md transition ${
                    currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"
                  }`}
                >
                  Prev
                </button>
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageClick(index + 1)}
                    className={`py-2 px-4 rounded-md transition ${
                      currentPage === index + 1
                        ? "bg-red-600 text-white"
                        : "bg-gray-900 border border-gray-800 text-white hover:bg-gray-800"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`bg-gray-900 border border-gray-800 text-white py-2 px-4 rounded-md transition ${
                    currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieRates;