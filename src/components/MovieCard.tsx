import React from "react";
import { getCurrencyFormat } from "../utils";
import CategoryBadges from "./CategoryBadges";

interface MovieCardProps {
  movie: Movie;
  categories: MovieCategory[];
  addToCart: AddToCart;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  categories,
  addToCart
}) => {
  return (
    <div className="col-mb-4 d-flex">
      <div className="card m-3 bg-dark shadow-sm">
        <div className="overlay">
          <img
            className="card-img-top img-fluid"
            alt={movie.name}
            src={movie.imageUrl}
          />
          <div className="card-description">
            <h4>{movie.name}</h4>
            <p>{movie.description}</p>
          </div>
        </div>
        <div className="card-footer">
          <div className="d-flex mb-3">
            <CategoryBadges movie={movie} categories={categories} />
          </div>
          <div className="d-flex flex-md-wrap align-items-center">
            <div className="h5 font-weight-bold mb-0 mr-auto">
              {getCurrencyFormat(movie.price)}
            </div>
            <button
              className="btn btn-primary"
              onClick={() => addToCart(movie, 1)}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
