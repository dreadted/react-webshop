import React, { useState } from "react";
import { getCurrencyFormat } from "../lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// components
import OrderRows from "./OrderRows";

interface OrderProps {
  order: Order;
  orderStatus: string[];
  products: Product[];
  updateItem: UpdateItem;
}

const Order: React.FC<OrderProps> = ({
  order,
  orderStatus,
  products,
  updateItem
}) => {
  const [openClass, setOpenClass] = useState<string>("open");

  const toCartItems = (orderRows: OrderRow[] | undefined) => {
    if (!orderRows) return [];
    return orderRows.map(orderRow => {
      const product: Product | undefined = products.find(
        product => product.id === orderRow.productId
      );
      return { product, quantity: orderRow.amount } as CartItem;
    });
  };

  return (
    <>
      <li className="cart-item list-group-item d-flex align-items-center justify-content-between bg-primary open">
        <div className="w-25">{order.id}</div>
        <div className="w-25">
          {new Date(order.created).toLocaleDateString("en-gb")}
        </div>
        <div className="badge badge-pill bg-dark">
          {order.status !== undefined ? orderStatus[order.status] : ""}
        </div>
        <div className="w-25 text-right">
          {getCurrencyFormat(order.totalPrice)}{" "}
        </div>
        <div className="ml-auto">
          <FontAwesomeIcon icon="angle-up" />
        </div>
      </li>
      <OrderRows
        items={toCartItems(order.orderRows)}
        editable={true}
        updateItem={updateItem}
        updateParams={{ order }}
        openClass={openClass}
      />
    </>
  );
};

interface OrderListProps {
  orders: Order[];
  orderStatus: string[];
  products: Product[];
  updateItem: UpdateItem;
}

const OrderList: React.FC<OrderListProps> = ({
  orders,
  orderStatus,
  products,
  updateItem
}) => {
  return (
    <div className="cart open">
      <ul className="list-group h5 m-0 open">
        {orders.map(order => (
          <Order
            key={order.created}
            order={order}
            orderStatus={orderStatus}
            products={products}
            updateItem={updateItem}
          />
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
