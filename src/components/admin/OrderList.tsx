import React, { useEffect, useContext } from "react";

// context
import { AdminContext } from "../contexts/AdminContext";

// components
import Order from "./Order";
import ToggleStatusFilter from "./ToggleStatusFilter";

interface OrderListProps {
  orders: Order[];
}

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  const { orderStatusArray } = useContext(AdminContext);
  const {
    statusFilter,
    setStatusFilter,
    statusMatches,
    setStatusMatches
  } = useContext(AdminContext);

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
  }, [orders, orderStatusArray, setStatusMatches]);

  return (
    <div className="cart">
      {orders.length ? (
        <ToggleStatusFilter
          statusFilter={statusFilter}
          statusMatches={statusMatches}
          changeStatusFilter={changeStatusFilter}
        />
      ) : undefined}
      <ul className="list-group m-0">
        {orders.map(order => (
          <Order key={order.id} order={order} />
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
