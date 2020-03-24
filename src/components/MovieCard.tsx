import React from "react";
import { getCurrencyFormat } from "../utils";

interface MovieCardProps {
  movie: Movie;
  categories: MovieCategory[];
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, categories }) => {
  const getCategoryBadges = () => {
    let result: React.ReactNodeArray = [];
    const currentCategories = categories.filter(category =>
      movie.productCategory.find(pc => pc.categoryId === category.id)
    );

    currentCategories.map(c =>
      result.push(
        <span
          key={c.id}
          className={`badge badge-pill mr-2 movie-category-${c.id}`}
        >
          {c.name}
        </span>
      )
    );
    return result;
  };

  return (
    <div className="col-mb-4 d-flex">
      <div className="card m-3 shadow-sm">
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
          <div className="mb-3">{getCategoryBadges()}</div>
          <div className="d-flex flex-md-wrap">
            <div className="h5 font-weight-bold mr-auto">
              {getCurrencyFormat(movie.price)}
            </div>
            <button className="btn btn-warning">Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
