import React from "react";
import Layout from "../Layout/Layout";
import Filters from "../Components/Filters";
import { MovieData } from "../Data/MovieData"; // Đổi tên dữ liệu Movies
import Movie from "../Components/Movie"; // Giữ nguyên tên component Movie
import { CgSpinner } from "react-icons/cg";
import { useState } from "react"; // Import useState từ React

function MoviesPage() {
  const maxPage = 10; // Số lượng phim trên mỗi trang
  const [page, setPage] = useState(maxPage);

  // Hàm tăng số lượng phim hiển thị
  const handleLoadingMore = () => {
    setPage(page + maxPage);
  };

  return (
    <Layout>
      <div className="min-h-screen container mx-auto px-2 my-6">
        <Filters />
        <p className="text-lg font-medium my-6">
          Total{" "}
          <span className="font-bold text-red-500">{MovieData?.length}</span>{" "}
          items found
        </p>
        <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
          {MovieData.slice(0, page)?.map((movie, index) => (
            <Movie key={index} movie={movie} />
          ))}
        </div>
        <div className="flex justify-center mt-10">
          {page < MovieData.length && (
            <button
              onClick={handleLoadingMore}
              className="bg-red-500 text-white px-4 py-2 rounded-md flex items-center gap-2 cursor-pointer hover:bg-red-600 transition duration-300"
            >
              <CgSpinner className="animate-spin" /> Load More
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default MoviesPage;
