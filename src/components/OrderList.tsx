import React, { useState } from "react";

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

  const changeStatusFilter = (selectedStatus: number) => {
    if (selectedStatus < orderStatusArray.length) {
      setStatusFilter(selectedStatus);
    }
  };

  return (
    <div className="cart open">
      <ToggleStatusFilter
        statusFilter={statusFilter}
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
