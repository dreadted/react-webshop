import React, { useState, useEffect } from "react";

// init
import { orderStatusArray } from "../lib/init";

// components
import Order from "./Order";
import ToggleStatusFilter from "./ToggleStatusFilter";

interface OrderListProps {
  orders: Order[];
  changeStatus: HandleChange;
  products: Product[];
  updateItem: UpdateItem;
  saveOrder: (order: Order) => Promise<Order>;
  deleteOrder: (order: Order) => void;
}

const OrderList: React.FC<OrderListProps> = ({
  orders,
  changeStatus,
  products,
  updateItem,
  saveOrder,
  deleteOrder
}) => {
  const [statusFilter, setStatusFilter] = useState<number>(-1);
  const [statusMatches, setStatusMatches] = useState<number[]>([]);

  const changeStatusFilter = (selectedStatus: number) => {
    if (selectedStatus < orderStatusArray.length) {
      setStatusFilter(selectedStatus);
    }
  };

  useEffect(() => {
    let matches: number[] = [];
    for (let i = 0; i < orderStatusArray.length; i++) {
      let counter = 0;
      orders.forEach(order => {
        if (order.status === i) counter++;
      });
      matches.push(counter);
    }
    setStatusMatches(matches);
  }, [orders]);

  useEffect(() => {
    if (!statusMatches[statusFilter]) setStatusFilter(-1);
  }, [statusFilter, statusMatches]);

  return (
    <div className="cart open">
      <ToggleStatusFilter
        statusFilter={statusFilter}
        statusMatches={statusMatches}
        changeStatusFilter={changeStatusFilter}
      />
      <ul className="list-group m-0 open">
        {orders.map(order => (
          <Order
            key={order.created}
            order={order}
            orderStatusArray={orderStatusArray}
            statusFilter={statusFilter}
            changeStatus={changeStatus}
            products={products}
            updateItem={updateItem}
            saveOrder={saveOrder}
            deleteOrder={deleteOrder}
          />
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
