import React, { useEffect, useState, Dispatch } from "react";
import { useParams, Redirect } from "react-router-dom";

// API
import { get } from "../lib/api";

// components
import MovieCard from "./MovieCard";
import Cart from "./Cart";
import NotFound from "./NotFound";

const NO_MOVIES: Movie[] = [
  {
    id: -1,
    name: "No movies",
    description: "",
    price: 0,
    imageUrl: "",
    year: 0,
    added: new Date(),
    productCategory: []
  }
];

interface SearchHitsProps {
  categories: MovieCategory[];
  movies: Movie[];
  cart: Cart;
  addToCart: AddToCart;
  updateCart: UpdateCart;
  toggleCart: () => void;
  setClearSearch: Dispatch<React.SetStateAction<boolean>>;
}

const SearchHits: React.FC<SearchHitsProps> = ({
  categories,
  movies,
  cart,
  addToCart,
  updateCart,
  toggleCart,
  setClearSearch
}) => {
  const { slug } = useParams();
  const [_movies, _setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (slug) {
      const setMoviesAsync = async () => {
        const hits: Movie[] = await get<Movie>(`search/?searchText=${slug}`);
        const result: Movie[] =
          hits && hits.length
            ? movies.filter(movie => hits.map(hit => hit.id).includes(movie.id))
            : NO_MOVIES;
        _setMovies(result);
      };

      setMoviesAsync();
    }
  }, [slug, movies]);

  useEffect(() => {
    return () => {
      setClearSearch(true);
    };
  }, []);

  return (
    <>
      {!slug && <Redirect to="/" />}
      {((!_movies || !_movies.length || _movies === NO_MOVIES) && (
        <NotFound hasButton={false} caption="Nope" />
      )) || (
        <>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
            {_movies.map(movie => (
              <MovieCard
                key={movie.id}
                movie={movie}
                categories={categories}
                addToCart={addToCart}
              />
            ))}
          </div>
        </>
      )}
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

export default SearchHits;
