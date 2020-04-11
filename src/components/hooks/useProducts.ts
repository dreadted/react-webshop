import { useState, useEffect } from "react";
import slugify from "slugify";

// API
import * as API from "../../lib/api";

// context
import {
  NEWS_CATEGORY,
  NUMBER_OF_ITEMS_IN_NEWS
} from "../contexts/ProductContext";

export const useProducts: () => {
  categories: ProductCategory[];
  products: Product[];
  loading: boolean;
} = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setLoading(!(categories.length && products.length));
  }, [loading, categories, products]);

  useEffect(() => {
    const setCategoriesAsync = async () => {
      const c: ProductCategory[] = await API.get<ProductCategory>(
        "categories",
        true
      );
      c.unshift(NEWS_CATEGORY);
      c.map(
        category => (category.slug = slugify(category.name, { lower: true }))
      );
      setCategories(c);
    };
    setCategoriesAsync();
  }, []);

  useEffect(() => {
    const setProductsAsync = async () => {
      const _products: Product[] = await API.get<Product>("products", true);
      populateNewsCategory(_products);
      _products.sort((x, y) => (x.name > y.name ? 1 : -1));
      setProducts(_products);
    };
    setProductsAsync();
  }, []);

  const populateNewsCategory = (_products: Product[]) => {
    _products.sort((x, y) => (x.added < y.added ? 1 : -1));
    _products
      .slice(0, NUMBER_OF_ITEMS_IN_NEWS)
      .map(product =>
        product.productCategory.push({ categoryId: NEWS_CATEGORY.id })
      );
  };

  return { categories, products, loading };
};
