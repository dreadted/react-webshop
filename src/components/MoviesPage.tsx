import React, { useState, useEffect } from "react";

// API
import * as API from "../api";
import { useParams, Route } from "react-router-dom";
import MovieCard from "./MovieCard";
import NoPage from "./NoPage";

interface MoviesPageProps {
  categories: MovieCategory[];
  addToCart: AddToCart;
}

const MoviesPage: React.FC<MoviesPageProps> = ({ categories, addToCart }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const { slug } = useParams();

  const newsCategory: number = -1;

  const currentCategory: MovieCategory | undefined = slug
    ? categories.find(category => category.slug === slug)
    : { id: newsCategory, name: "Newly added" };

  useEffect(() => {
    async function setMoviesAsync() {
      const m: Movie[] = await API.getMovies();
      m.sort((x, y) => (x.name > y.name ? 1 : -1));
      setMovies(m);
    }
    setMoviesAsync();
  }, []);

  const getMoviesFromCategory = (category: MovieCategory) => {
    return movies.filter(movie => {
      return movie.productCategory.find(cat => cat.categoryId === category.id);
    });
  };

  const getLastAddedMovies = (numberOfMovies: number) => {
    const m: Movie[] = Array.from(movies);
    m.sort((x, y) => (x.added < y.added ? 1 : -1));
    return m.slice(0, numberOfMovies);
  };

  return (
    <>
      {!currentCategory && <Route component={NoPage} />}
      <h2 className="display-4 m-4">
        {currentCategory && currentCategory.name}
      </h2>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
        {(currentCategory &&
          currentCategory.id === newsCategory &&
          getLastAddedMovies(4).map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              categories={categories}
              addToCart={addToCart}
            />
          ))) ||
          (currentCategory &&
            getMoviesFromCategory(currentCategory).map(movie => (
              <MovieCard
                key={movie.id}
                movie={movie}
                categories={categories}
                addToCart={addToCart}
              />
            )))}
      </div>
    </>
  );
};

export default MoviesPage;
