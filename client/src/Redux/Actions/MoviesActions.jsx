import * as moviesConstants from "../Constants/MoviesConstants";
import * as moviesAPIs from "../APIs/MoviesService";
import { toast } from "react-toastify";
import { ErrorAction } from "../Protection";

// GET ALL MOVIES ACTION
export const getAllMovies =
  ({
    genre = "",
    language = "",
    year_min = "",
    year_max = "",
    duration_min = "",
    duration_max = "",
    rating_min = "",
    rating_max = "",
    quality = "",
    status = "",
    search = "",
    pageNumber = "",
  }) =>
  async (dispatch) => {
    try {
      dispatch({ type: moviesConstants.MOVIES_LIST_REQUEST });
      const response = await moviesAPIs.getAllMoviesService({
        genre,
        language,
        year_min,
        year_max,
        duration_min,
        duration_max,
        rating_min,
        rating_max,
        quality,
        status,
        search,
        pageNumber,
      });
      dispatch({
        type: moviesConstants.MOVIES_LIST_SUCCESS,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: moviesConstants.MOVIES_LIST_FAIL,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
