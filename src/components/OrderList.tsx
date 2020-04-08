import React, { useState } from "react";

// components
import Order from "./Order";

interface OrderListProps {
  orders: Order[];
  orderStatus: string[];
  changeStatus: HandleChange;
  products: Product[];
  updateItem: UpdateItem;
  saveOrder: (order: Order) => Promise<Order>;
  deleteOrder: (order: Order) => void;
}

const OrderList: React.FC<OrderListProps> = ({
  orders,
  orderStatus,
  changeStatus,
  products,
  updateItem,
  saveOrder,
  deleteOrder
}) => {
  const [statusFilter, setStatusFilter] = useState<number>(-1);

  const changeStatusFilter = (selectedStatus: number) => {
    if (selectedStatus < orderStatus.length) {
      setStatusFilter(selectedStatus);
    }
  };

  return (
    <div className="cart open">
      <fieldset className="form-group pb-4">
        <div className="form-check form-check-inline m-0" key={"no"}>
          <label className="form-check-label">
            <span>
              <input
                type="radio"
                className="form-check-input"
                name="status"
                id="no"
                value={statusFilter}
                onChange={() => changeStatusFilter(-1)}
                checked={statusFilter === -1}
              />
              All
            </span>
          </label>
        </div>
        {orderStatus.map((status, index) => (
          <div className="form-check form-check-inline m-0" key={status}>
            <label className="form-check-label">
              <span>
                <input
                  type="radio"
                  className="form-check-input"
                  name="status"
                  id={status}
                  value={statusFilter}
                  onChange={() => changeStatusFilter(index)}
                />
                {status}
              </span>
            </label>
          </div>
        ))}
      </fieldset>
      <ul className="list-group m-0 open">
        {orders.map(order => (
          <Order
            key={order.created}
            order={order}
            orderStatus={orderStatus}
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
