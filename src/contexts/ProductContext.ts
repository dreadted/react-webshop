import { createContext } from "react";

export const emptyCart: Cart = {
  items: new Map(),
  articles: 0,
  subTotal: 0,
  blink: false,
  open: false
};

export const MIN_QTY = 1;
export const MAX_QTY = 99;
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
