import API from "./Axios";

// ********** PUBLIC APIs **********

// get all movies function
export const getAllMoviesService = async ({
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
}) => {
  const response = await API.get(
    `/movies?${new URLSearchParams({
      genre: genre || "",
      language: language || "",
      year_min: year_min || "",
      year_max: year_max || "",
      duration_min: duration_min || "",
      duration_max: duration_max || "",
      rating_min: rating_min || "",
      rating_max: rating_max || "",
      quality: quality || "",
      status: status || "",
      search: search || "",
      page: pageNumber || "1",
    }).toString()}`
  );
  return response.data;
};
