import { createContext } from "react";

export const companies: Company[] = [
  { id: 0, name: "" },
  { id: 9001, name: "Telia" },
  { id: 9002, name: "Volvo" },
  { id: 9003, name: "Skanska" },
  { id: 9004, name: "ABB" }
];

export const emptyOrder: Order = {
  companyId: 0,
  created: "",
  createdBy: "",
  paymentMethod: "",
  totalPrice: 0,
  status: 0
};

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
  emptyOrder: Order;
  orderStatusArray: string[];
}

export const OrderContext = createContext<IOrderContext>({
  companies,
  emptyOrder,
  orderStatusArray
});
