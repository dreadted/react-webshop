import React, { useState, useEffect } from "react";

// API
import * as API from "../api";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard";

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

  const lastAddedMovies = () => {
    const m: Movie[] = Array.from(movies);
    m.sort((x, y) => (x.added < y.added ? 1 : -1));
    return m.slice(0, 3);
  };

  return (
    <>
      <h2>{(currentCategory && currentCategory.name) || "Latest additions"}</h2>
      <div className="row">
        {(currentCategory &&
          movies.map(movie => {
            return movie.productCategory.map(
              cat =>
                cat.categoryId === currentCategory.id && (
                  <MovieCard key={movie.id} movie={movie} />
                )
            );
          })) ||
          lastAddedMovies().map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
      </div>
    </>
  );
};

export default MoviesPage;
