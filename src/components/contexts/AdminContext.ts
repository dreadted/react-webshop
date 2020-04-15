import { createContext } from "react";

interface IAdminContext {
  orderStatusArray: string[];
  orderStatusColors: string[];
  statusFilter: number;
  setStatusFilter: React.Dispatch<React.SetStateAction<number>>;
  statusMatches: number[];
  setStatusMatches: React.Dispatch<React.SetStateAction<number[]>>;
  changeOrderStatus: (status: number, order: Order) => void;
  updateItem: UpdateItem;
  saveOrder: (order: Order) => Promise<Order>;
  deleteOrder: (order: Order) => Promise<Order>;
}

export const orderStatusArray = [
  "Confirmed",
  "Completed",
  "Pending",
  "Shipped",
  "Received",
  "Denied",
  "Cancelled",
  "Refunded"
];

export const orderStatusColors = [
  "#2f4858",
  "#19629e",
  "#dc8346",
  "#4a9147",
  "#006f60",
  "#d9534f",
  "#954f87",
  "#665074"
];

const statusFilter = 0;
const setStatusFilter = () => {};
const statusMatches: number[] = [];
const setStatusMatches = () => {};
const changeOrderStatus: (status: number, order: Order) => void = () => {};
const updateItem: UpdateItem = () => {};
const saveOrder: (order: Order) => Promise<Order> = async order =>
  new Promise(() => {});
const deleteOrder: (order: Order) => Promise<Order> = async order =>
  new Promise(() => {});

export const AdminContext = createContext<IAdminContext>({
  orderStatusArray,
  orderStatusColors,
  statusFilter,
  setStatusFilter,
  statusMatches,
  setStatusMatches,
  changeOrderStatus,
  updateItem,
  saveOrder,
  deleteOrder
});
