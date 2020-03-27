import React from "react";
import { getCurrencyFormat } from "../utils";

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
  const getCategoryBadges = () => {
    let result: React.ReactNodeArray = [];
    const currentCategories = categories.filter(category =>
      movie.productCategory.find(pc => pc.categoryId === category.id)
    );

    currentCategories.map(c =>
      result.push(
        <div
          key={c.id}
          className={`badge badge-pill mr-2 movie-category-${c.id}`}
        >
          {c.name}
        </div>
      )
    );
    return result;
  };

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
          <div className="d-flex mb-3">{getCategoryBadges()}</div>
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
