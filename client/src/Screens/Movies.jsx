import React, { useState, useEffect, useCallback } from "react";
import Layout from "../Layout/Layout";
import Filters from "../Components/Filters";
import Movie from "../Components/Movie";
import { CgSpinner } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategoriesAction } from "../Redux/Actions/CategoriesActions";
import { getAllMovies } from "../Redux/Actions/MoviesActions";
import { toast } from "react-hot-toast";
import Loader from "../Components/Notfications/Loader";
import { RiMovie2Line } from "react-icons/ri";

function MoviesPage() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [loadedMovies, setLoadedMovies] = useState([]);
  const sameClass = "w-full gap-6 flex-col min-h-screen";
  
  // Get movies state from Redux
  const { 
    isLoading, 
    isError, 
    movies = [], 
    pages: totalPages = 1,
    totalMovies = 0 
  } = useSelector((state) => state.getAllMovies);

  // Get categories
  const { categories } = useSelector((state) => state.categoriesGetAll);

  // Load initial data
  useEffect(() => {
    dispatch(getAllCategoriesAction());
    loadMovies(1);
  }, [dispatch]);

  // Function to load movies
  const loadMovies = useCallback((page) => {
    dispatch(getAllMovies({ pageNumber: page }));
  }, [dispatch]);

  // Update loadedMovies when new movies arrive
  useEffect(() => {
    if (movies?.length > 0) {
      if (currentPage === 1) {
        setLoadedMovies(movies);
      } else {
        setLoadedMovies(prev => {
          // Create a Set of existing movie IDs
          const existingIds = new Set(prev.map(m => m._id));
          // Filter out duplicates and add new movies
          const newMovies = movies.filter(movie => !existingIds.has(movie._id));
          return [...prev, ...newMovies];
        });
      }
    }
  }, [movies, currentPage]);

  // Handle errors
  useEffect(() => {
    if (isError) {
      toast.error(isError);
    }
  }, [isError]);

  // Load more movies
  const handleLoadMore = () => {
    if (!isLoading && currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      loadMovies(nextPage);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen container mx-auto px-2 my-6">
        <Filters categories={categories} />
        <div className="flex justify-between items-center my-6">
          <p className="text-lg font-medium">
            Total{" "}
            <span className="font-bold text-red-500">
              {totalMovies || 0}
            </span>{" "}
            items found
          </p>
          <p className="text-sm text-gray-500">
            Showing {loadedMovies.length} of {totalMovies}
          </p>
        </div>
        
        {isLoading && currentPage === 1 ? (
          <div className={sameClass}>
            <Loader />
          </div>
        ) : loadedMovies.length > 0 ? (
          <>
            <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
              {loadedMovies.map((movie, index) => (
                <Movie key={movie._id || index} movie={movie} />
              ))}
            </div>
            
            {currentPage < totalPages && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={handleLoadMore}
                  disabled={isLoading}
                  className="bg-red-500 text-white px-6 py-3 rounded-md flex items-center gap-3 cursor-pointer hover:bg-red-600 transition duration-300 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <CgSpinner className="animate-spin text-xl" />
                      <span>Loading...</span>
                    </>
                  ) : (
                    <>
                      <span>Load More</span>
                      <span className="text-sm">
                        ({loadedMovies.length} of {totalMovies})
                      </span>
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className={`${sameClass} items-center justify-center`}>
            <div className="flex flex-col items-center justify-center">
              <div className="w-28 h-28 rounded-full mb-4 bg-main text-subMain flex items-center justify-center transform hover:scale-105 transition-all duration-300">
                <RiMovie2Line className="text-5xl"/>
              </div>
              <h3 className="text-3xl font-bold text-text text-center mb-2">
                No Movies Found
              </h3>
              <p className="text-gray-400 text-center text-sm">
                It seems like there are no movies available
              </p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default MoviesPage;
