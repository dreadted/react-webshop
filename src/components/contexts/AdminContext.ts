import { createContext } from "react";

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
  "#395f97",
  "#327694",
  "#2d7b64",
  "#5d8039",
  "#ac833a",
  "#97527a",
  "#95373c",
  "#6e5c9d"
];

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

export const AdminContext = createContext<IAdminContext>({
  orderStatusArray,
  orderStatusColors,
  statusFilter: 0,
  setStatusFilter: () => {},
  statusMatches: [],
  setStatusMatches: () => {},
  changeOrderStatus: () => {},
  updateItem: () => {},
  saveOrder: async () => new Promise(() => {}),
  deleteOrder: async () => new Promise(() => {})
});
