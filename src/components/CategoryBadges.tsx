import React from "react";
import { Link } from "react-router-dom";

interface CategoryBadges {
  product: Product;
  categories: ProductCategory[];
}

const CategoryBadges: React.FC<CategoryBadges> = ({ product, categories }) => {
  let result: React.ReactNodeArray = [];
  const currentCategories = categories.filter(
    category =>
      category.id > 0 &&
      product.productCategory?.find(pc => pc.categoryId === category.id)
  );

  currentCategories.map(c =>
    result.push(
      <Link
        key={c.id}
        className={`badge badge-pill mr-2 text-secondary product-category-${c.id}`}
        to={`/${c.slug}`}
      >
        {c.name}
      </Link>
    )
  );
  return <>{result}</>;
};

export default CategoryBadges;
