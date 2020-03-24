import React from "react";
import { getCurrencyFormat } from "../utils";
import MovieCardWrapper from "./MovieCardWrapper";

interface MovieCardProps {
  movie: Movie;
  index: number;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, index }) => {
  return (
    <>
      <div className="card my-3 bg-dark shadow-sm">
        <img
          className="card-img-top img-fluid"
          alt={movie.name}
          src={movie.imageUrl}
        />
        <div className="card-body p-4">
          <div className="d-flex flex-md-wrap h5 font-weight-bold">
            <div className="mr-auto">{movie.name}</div>
            <div>{getCurrencyFormat(movie.price)}</div>
          </div>
          <p>{movie.description}</p>
        </div>
        <div className="card-footer">
          <button className="btn btn-warning">Add to cart</button>
        </div>
      </div>
      <MovieCardWrapper index={index + 1} />
    </>
  );
};

export default MovieCard;
