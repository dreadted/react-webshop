import { createContext } from "react";

interface IAdminContext {
  statusFilter: number;
  setStatusFilter: React.Dispatch<React.SetStateAction<number>>;
  statusMatches: number[];
  setStatusMatches: React.Dispatch<React.SetStateAction<number[]>>;
  changeOrderStatus: (status: number, order: Order) => void;
  updateItem: UpdateItem;
  saveOrder: (order: Order) => Promise<Order>;
  deleteOrder: (order: Order) => Promise<Order>;
}

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
  statusFilter,
  setStatusFilter,
  statusMatches,
  setStatusMatches,
  changeOrderStatus,
  updateItem,
  saveOrder,
  deleteOrder
});
