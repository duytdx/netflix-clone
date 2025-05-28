import * as moviesConstants from "../Constants/MoviesConstants";

// GET ALL MOVIES REDUCER
export const getAllMoviesReducer = (
  state = { 
    isLoading: false,
    movies: [],
    pages: 1,
    page: 1,
    totalMovies: 0
  }, 
  action
) => {
  switch (action.type) {
    case moviesConstants.MOVIES_LIST_REQUEST:
      return { 
        ...state,
        isLoading: true 
      };
    case moviesConstants.MOVIES_LIST_SUCCESS:
      return {
        isLoading: false,
        movies: action.payload.movies,
        pages: action.payload.totalPages,
        page: action.payload.currentPage,
        totalMovies: action.payload.totalMovies,
      };
    case moviesConstants.MOVIES_LIST_FAIL:
      return { 
        ...state,
        isLoading: false, 
        isError: action.payload 
      };
    default:
      return state;
  }
};
