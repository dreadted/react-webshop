import React from "react";
import { useParams, Route, Redirect } from "react-router-dom";

//components
import MovieCard from "./MovieCard";
import Cart from "./Cart";
import NoPage from "./NoPage";
import TopMargin from "./TopMargin";

interface MoviesPageProps {
  categories: MovieCategory[];
  movies: Movie[];
  cart: Cart;
  addToCart: AddToCart;
  updateCart: UpdateCart;
  toggleCart: () => void;
}

const NEWS_CATEGORY = -1;

const MoviesPage: React.FC<MoviesPageProps> = ({
  categories,
  movies,
  cart,
  addToCart,
  updateCart,
  toggleCart
}) => {
  const { slug } = useParams();
  const currentCategory: MovieCategory | undefined = slug
    ? categories.find(category => category.slug === slug)
    : categories.find(category => category.id === NEWS_CATEGORY);

  const getMoviesFromCategory = (category: MovieCategory) => {
    return movies.filter(movie => {
      return movie.productCategory.find(cat => cat.categoryId === category.id);
    });
  };

  return (
    <>
      {!currentCategory && <Route component={NoPage} />}
      {!slug && currentCategory && (
        <Redirect to={`/movies/${currentCategory.slug}`} />
      )}
      <TopMargin />
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
