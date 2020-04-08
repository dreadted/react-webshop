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
