import { createContext } from "react";
import { CartDispatch } from "../hooks/useCart";
import slugify from "slugify";

export const companies: Company[] = [
  { id: 0, name: "" },
  { id: 9001, name: "Telia" },
  { id: 9002, name: "Volvo" },
  { id: 9003, name: "Skanska" },
  { id: 9004, name: "ABB" }
];

companies.map(
  company => (company.slug = slugify(company.name, { lower: true }))
);

export const emptyCart: Cart = {
  items: new Map<Product, number>(),
  articles: 0,
  subTotal: 0,
  blink: false,
  open: false,
  modal: {
    caption: "Delete item?",
    labelConfirm: "Delete",
    labelCancel: "Cancel",
    show: false
  }
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

export const errorMessage = {
  createdBy: "Please provide an accurate e-mail address!",
  companyId: "Please select company!",
  paymentMethod: "Please select payment method!"
};

interface IOrderContext {
  companies: Company[];
  cart: Cart;
  dispatch: CartDispatch;
  order: Order;
  setOrder: React.Dispatch<React.SetStateAction<Order>>;
}

export const OrderContext = createContext<IOrderContext>({
  companies,
  cart: emptyCart,
  dispatch: () => {},
  order: emptyOrder,
  setOrder: () => {}
});
