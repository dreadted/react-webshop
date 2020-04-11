import { createContext } from "react";
import { CartDispatch } from "../hooks/useCart";

export const companies: Company[] = [
  { id: 0, name: "" },
  { id: 9001, name: "Telia" },
  { id: 9002, name: "Volvo" },
  { id: 9003, name: "Skanska" },
  { id: 9004, name: "ABB" }
];

export const emptyCart: Cart = {
  items: new Map<Product, number>(),
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

export const orderStatusArray = [
  "Confirmed",
  "Denied",
  "Completed",
  "Pending",
  "Refunded",
  "Shipped",
  "Received",
  "Cancelled"
];

interface IOrderContext {
  companies: Company[];
  cart: Cart;
  dispatch: CartDispatch;
  emptyOrder: Order;
  orderStatusArray: string[];
}

const cart = { ...emptyCart };
const dispatch: CartDispatch = () => {};

export const OrderContext = createContext<IOrderContext>({
  companies,
  cart,
  dispatch,
  emptyOrder,
  orderStatusArray
});
