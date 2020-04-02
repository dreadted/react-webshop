import React, { useState, useEffect, useRef } from "react";
import { getCurrencyFormat } from "../lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconName } from "@fortawesome/fontawesome-svg-core";

// components
import OrderRows from "./OrderRows";
import SelectOrderStatus from "./SelectOrderStatus";

const PAY_METHODS = [
  { icon: "cc-visa" as IconName, name: "Visa" },
  { icon: "cc-mastercard" as IconName, name: "MasterCard" },
  { icon: "cc-amex" as IconName, name: "Amex" }
];

interface OrderProps {
  order: Order;
  orderStatus: string[];
  changeStatus: HandleChangeStatus;
  products: Product[];
  updateItem: UpdateItem;
  saveOrder: (order: Order) => void;
}

const Order: React.FC<OrderProps> = ({
  order,
  orderStatus,
  changeStatus,
  products,
  updateItem,
  saveOrder
}) => {
  const [openClass, setOpenClass] = useState<string>("");

  const toCartItems = (orderRows: OrderRow[] | undefined) => {
    if (!orderRows) return [];
    return orderRows.map(orderRow => {
      const product: Product | undefined = products.find(
        product => product.id === orderRow.productId
      );
      return { product, quantity: orderRow.amount } as CartItem;
    });
  };

  const getPaymentIcon = (name: string) => {
    const icon = PAY_METHODS.find(
      i => i.name.toLowerCase() === name.toLowerCase()
    );
    debugger;
    if (icon) return <FontAwesomeIcon icon={["fab", icon.icon]} size="lg" />;
    return undefined;
  };

  const toggleOpen = () => {
    setOpenClass(openClass === "" ? "open" : "");
  };

  return (
    <li className="list-group-item p-0 mb-4">
      <ul className="list-group">
        <li
          className={`cart-header toggle list-group-item d-flex align-items-center justify-content-between bg-primary ${openClass}`}
          onClick={toggleOpen}
        >
          <div className="">{order.id}</div>
          <div className="w-25 text-center">
            <small>{new Date(order.created).toLocaleDateString("en-gb")}</small>
          </div>
          <div className="badge badge-pill bg-dark w-25">
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
        <li
          className={`cart-item cart-footer list-group-item d-flex justify-content-between align-items-center flex-wrap px-3 py-0 m-0 ${openClass}`}
        >
          <div>
            <small>{getPaymentIcon(order.paymentMethod)}</small>
          </div>
          <div>
            <small>{order.createdBy}</small>
          </div>
          <div>
            <SelectOrderStatus
              order={order}
              orderStatus={orderStatus}
              onChange={changeStatus}
              selected={order.status}
            />
          </div>
          <div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => saveOrder(order)}
            >
              Save changes
            </button>
          </div>
        </li>
      </ul>
    </li>
  );
};

interface OrderListProps {
  orders: Order[];
  orderStatus: string[];
  changeStatus: HandleChangeStatus;
  products: Product[];
  updateItem: UpdateItem;
  saveOrder: (order: Order) => void;
}

const OrderList: React.FC<OrderListProps> = ({
  orders,
  orderStatus,
  changeStatus,
  products,
  updateItem,
  saveOrder
}) => {
  return (
    <div className="cart open">
      <ul className="list-group h5 m-0 open">
        {orders.map(order => (
          <Order
            key={order.created}
            order={order}
            orderStatus={orderStatus}
            changeStatus={changeStatus}
            products={products}
            updateItem={updateItem}
            saveOrder={saveOrder}
          />
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
