import React from "react";
import { useParams, Route } from "react-router-dom";

//components
import MovieCard from "./MovieCard";
import Cart from "./Cart";
import NoPage from "./NoPage";

interface MoviesPageProps {
  categories: MovieCategory[];
  movies: Movie[];
  cart: Cart;
  addToCart: AddToCart;
  updateCart: UpdateCart;
  toggleCart: () => void;
}

const MoviesPage: React.FC<MoviesPageProps> = ({
  categories,
  movies,
  cart,
  addToCart,
  updateCart,
  toggleCart
}) => {
  const { slug } = useParams();
  const NEWS_CATEGORY = -1;
  const NUMBER_OF_ITEMS_IN_NEWS = 4;
  const currentCategory: MovieCategory | undefined = slug
    ? categories.find(category => category.slug === slug)
    : { id: NEWS_CATEGORY, name: "Newly added" };

  const _movies: Movie[] = Array.from(movies);
  _movies.sort((x, y) => (x.added < y.added ? 1 : -1));
  _movies
    .slice(0, NUMBER_OF_ITEMS_IN_NEWS)
    .map(movie => movie.productCategory.push({ categoryId: NEWS_CATEGORY }));

  const getMoviesFromCategory = (category: MovieCategory) => {
    return movies.filter(movie => {
      return movie.productCategory.find(cat => cat.categoryId === category.id);
    });
  };

  return (
    <>
      {!currentCategory && <Route component={NoPage} />}
      <div className="top-margin-sm d-none d-sm-block"></div>
      <div className="top-margin-xs d-block d-sm-none"></div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
        {currentCategory &&
          getMoviesFromCategory(currentCategory).map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              categories={categories}
              addToCart={addToCart}
            />
          ))}
      </div>
      <div className={`${cart.open ? "" : "fixed-bottom"}`}>
        <div className="row">
          <div className="col col-sm-8 col-lg-6">
            <Cart
              cart={cart}
              updateCart={updateCart}
              toggleCart={toggleCart}
              atCheckout={false}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MoviesPage;
