import React from "react";
import { getCurrencyFormat } from "../utils";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="col-sm-6 col-lg-4">
      <div className="card my-3 p-4 bg-dark shadow-sm">
        <img className="card-img-top" alt={movie.name} src={movie.imageUrl} />
        <div className="card-body px-1">
          <div className="d-flex flex-md-wrap h5 font-weight-bold">
            <div className="mr-auto">{movie.name}</div>
            <div>{getCurrencyFormat(movie.price)}</div>
          </div>
          <p>{movie.description}</p>
          <button className="btn btn-warning">Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
