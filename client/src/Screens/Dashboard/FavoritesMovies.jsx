import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import SideBar from "./SideBar";
import Table from "../../Components/Table";
import Loader from "../../Components/Notfications/Loader";
import { getFavoriteMoviesAction, deleteFavoriteMovieAction } from "../../Redux/Actions/userActions";
import { GET_FAVORITE_MOVIES_RESET, DELETE_FAVORITE_MOVIE_RESET } from "../../Redux/Constants/userConstants";
import Empty from "../../Components/Notfications/Empty";

function FavoritesMovies() {
  const dispatch = useDispatch();
  const { isLoading, isError, favoriteMovies } = useSelector((state) => state.getFavoriteMovies);
  // delete favorite movie
  const {isLoading:deleteLoading, isError:deleteError, isSuccess} = useSelector((state) => state.deleteFavoriteMovie);

  // delete movies handler
  const deleteMoviesHandler = () => {
    window.confirm("Are you sure you want to delete all your favorite movies?") && dispatch(deleteFavoriteMovieAction());
  }

  useEffect(() => {
    dispatch(getFavoriteMoviesAction());
    if (isError || deleteError) {
      toast.error(isError || deleteError);
      dispatch({type: isError ? GET_FAVORITE_MOVIES_RESET : DELETE_FAVORITE_MOVIE_RESET});
    }
  }, [dispatch, isError, deleteError, isSuccess]);

  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-xl font-bold">Favorites Movies</h2>
          {
            favoriteMovies && favoriteMovies.length > 0 && (
              <button className="bg-main font-medium transition hover:bg-red-500 border border-red-500 text-white py-3 px-6 rounded" onClick={deleteMoviesHandler}>
                {deleteLoading ? "Deleting..." : "Clear All"}
              </button>
            )
          }
        </div>
        {isLoading ? (
          <Loader />
        ) : favoriteMovies && favoriteMovies.length > 0 ? (
          <Table data={favoriteMovies} admin={false} />
        ) : (
          <Empty message="No favorite movies found" />
        )}
      </div>
    </SideBar>
  );
}

export default FavoritesMovies;
