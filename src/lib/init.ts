export const emptyCart: Cart = {
  items: new Map(),
  articles: 0,
  subTotal: 0,
  blink: false,
  open: false
};

export const emptyOrder: Order = {
  companyId: 0,
  created: "",
  createdBy: "",
  paymentMethod: "",
  totalPrice: 0,
  status: 0
};

export const MIN_QTY = 1;
export const MAX_QTY = 99;
export const NEWS_CATEGORY: ProductCategory = { id: -1, name: "Newly added" };
export const NUMBER_OF_ITEMS_IN_NEWS = 4;

export const companies: Company[] = [
  { id: 0, name: "" },
  { id: 9001, name: "Telia" },
  { id: 9002, name: "Volvo" },
  { id: 9003, name: "Skanska" },
  { id: 9004, name: "ABB" }
];

export const orderStatus = [
  "Confirmed",
  "Denied",
  "Completed",
  "Pending",
  "Refunded",
  "Shipped",
  "Received",
  "Cancelled"
];
