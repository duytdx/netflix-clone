import React, { useState } from "react";
import { useParams } from "react-router-dom";
import MovieInfo from "../Components/Single/MovieInfo";
import { MovieData } from "../Data/MovieData";
import Layout from "../Layout/Layout";
import MovieCasts from "../Components/Single/MovieCasts";
import MovieRates from "../Components/Single/MovieRates";
import ShareMovieModal from "../Components/Modals/ShareModal";

function SingleMovie() {
  const [modalOpen, setModalOpen] = useState(false);
  const { id } = useParams();
  const movie = MovieData.find((movie) => movie.name === id);
  return (
    <Layout>
      <ShareMovieModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        movie={movie}
      />
      <MovieInfo movie={movie} setModalOpen={setModalOpen}/>
      <div className="container mx-auto min-h-screen px-2 my-6">
        <MovieCasts />
        <MovieRates movie={movie} />
      </div>
    </Layout>
  );
}

export default SingleMovie;
