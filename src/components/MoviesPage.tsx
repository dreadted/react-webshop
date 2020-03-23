import React, { useState, useEffect } from "react";

// API
import * as API from "../api";
import { useParams } from "react-router-dom";
import { getEnabledCategories } from "trace_events";

interface MoviesPageProps {
  categories: MovieCategory[];
}

const MoviesPage: React.FC<MoviesPageProps> = ({ categories }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const { slug } = useParams();
  const currentCategory: MovieCategory | undefined = slug
    ? categories.find(category => category.slug === slug)
    : undefined;

  useEffect(() => {
    async function setMoviesAsync() {
      const m: Movie[] = await API.getMovies();
      m.sort((x, y) => (x.name > y.name ? 1 : -1));
      setMovies(m);
    }
    setMoviesAsync();
  }, [movies]);

  return (
    <>
      <h2>{currentCategory && currentCategory.name}</h2>
      {currentCategory &&
        movies.map(movie => {
          return (
            <p>
              {movie.productCategory.map(
                cat => cat.categoryId === currentCategory.id && movie.name
              )}
            </p>
          );
        })}
    </>
  );
};

export default MoviesPage;
