import React, { useState, useEffect, useContext } from "react";

// context
import { OrderContext } from "../../contexts/OrderContext";

// components
import Order from "./Order";
import ToggleStatusFilter from "./ToggleStatusFilter";

interface OrderListProps {
  orders: Order[];
  changeStatus: HandleChange;
  updateItem: UpdateItem;
  saveOrder: (order: Order) => Promise<Order>;
  deleteOrder: (order: Order) => Promise<Order>;
}

const OrderList: React.FC<OrderListProps> = ({
  orders,
  changeStatus,
  updateItem,
  saveOrder,
  deleteOrder
}) => {
  const { orderStatusArray } = useContext(OrderContext);
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
  }, [orders, orderStatusArray]);

  useEffect(() => {
    if (!statusMatches[statusFilter]) setStatusFilter(-1);
  }, [statusFilter, statusMatches]);

  return (
    <div className="cart open">
      {orders.length ? (
        <ToggleStatusFilter
          statusFilter={statusFilter}
          statusMatches={statusMatches}
          changeStatusFilter={changeStatusFilter}
        />
      ) : undefined}
      <ul className="list-group m-0 open">
        {orders.map(order => (
          <Order
            key={order.id}
            order={order}
            statusFilter={statusFilter}
            changeStatus={changeStatus}
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
