import React from "react";
import { Link } from "react-router-dom";

interface CategoryBadges {
  movie: Movie;
  categories: MovieCategory[];
}

const CategoryBadges: React.FC<CategoryBadges> = ({ movie, categories }) => {
  let result: React.ReactNodeArray = [];
  const currentCategories = categories.filter(category =>
    movie.productCategory.find(pc => pc.categoryId === category.id)
  );

  currentCategories.map(c =>
    result.push(
      <Link
        key={c.id}
        className={`badge badge-pill mr-2 text-secondary movie-category-${c.id}`}
        to={`/${c.slug}`}
      >
        {c.name}
      </Link>
    )
  );
  return <>{result}</>;
};

export default CategoryBadges;
