import { createContext } from "react";

export const NEWS_CATEGORY: ProductCategory = { id: -1, name: "Newly added" };
export const NUMBER_OF_ITEMS_IN_NEWS = 4;

interface IProductContext {
  categories: ProductCategory[];
  products: Product[];
  news: { NEWS_CATEGORY: ProductCategory; NUMBER_OF_ITEMS_IN_NEWS: number };
}

export const ProductContext = createContext<IProductContext>({
  categories: [],
  products: [],
  news: { NEWS_CATEGORY, NUMBER_OF_ITEMS_IN_NEWS }
});
