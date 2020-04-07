import React, { useState, useEffect } from "react";
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
  changeStatus: HandleChange;
  products: Product[];
  updateItem: UpdateItem;
  saveOrder: (order: Order) => Promise<Order>;
  deleteOrder: (order: Order) => void;
}

const Order: React.FC<OrderProps> = ({
  order,
  orderStatus,
  changeStatus,
  products,
  updateItem,
  saveOrder,
  deleteOrder
}) => {
  const [openClass, setOpenClass] = useState<string>("");
  const [isDirty, setDirty] = useState<boolean>(false);
  const [isSaved, setSaved] = useState<boolean>(false);

  useEffect(() => {
    if (isSaved) {
      setTimeout(() => setSaved(false), 1000);
    }
  });

  const onChangeStatus: HandleChange = e => {
    setSaved(false);
    setDirty(true);
    changeStatus(e, order);
  };

  const onChangeItem: HandleChange = (e, params) => {
    setSaved(false);
    setDirty(true);
    updateItem(params);
  };

  const onSubmit: HandleClick = async (order: Order) => {
    const response = await saveOrder(order);
    if (response && response.status && [200, 204].includes(response.status)) {
      setSaved(true);
      setDirty(false);
    }
  };

  const onClick: HandleClick = e => {
    if (!e.target.className.includes("badge-select")) toggleOpen(e);
  };

  const toggleOpen = (e: any) => {
    setOpenClass(openClass === "" ? "open" : "");
  };

  const saved = () => {
    return isSaved ? "btn-success" : "btn-primary";
  };

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
    if (icon) return <FontAwesomeIcon icon={["fab", icon.icon]} size="lg" />;
    return undefined;
  };

  return (
    <li className="list-group-item p-0 mb-4">
      <ul className="list-group">
        <li
          className={`cart-header toggle list-group-item d-flex align-items-center justify-content-between bg-primary ${openClass}`}
          onClick={onClick}
        >
          <div className="">{order.id}</div>
          <div className="w-25 text-center">
            {new Date(order.created).toLocaleDateString("en-gb")}
          </div>
          <div className="badge badge-pill bg-dark w-25">
            <SelectOrderStatus
              order={order}
              orderStatus={orderStatus}
              onChange={onChangeStatus}
              selected={order.status}
            />
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
          onChange={onChangeItem}
          updateParams={{ order }}
          openClass={openClass}
        />
        <li
          className={`cart-item cart-footer list-group-item d-flex justify-content-between align-items-center flex-wrap p-2 pl-3 m-0 ${openClass}`}
        >
          <div>
            <small>{getPaymentIcon(order.paymentMethod)}</small>
          </div>
          <div className="flex-grow-1 overflow-hidden mx-2">
            <small>{order.createdBy}</small>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => deleteOrder(order)}
            >
              Delete
            </button>
          </div>
          {order.totalPrice ? (
            <div className="w-15 ml-2">
              <button
                type="button"
                className={`w-100 btn ${saved()}`}
                disabled={!isDirty}
                onClick={() => onSubmit(order)}
              >
                {(isSaved && <FontAwesomeIcon icon="check" />) || "Save"}
              </button>
            </div>
          ) : undefined}
        </li>
      </ul>
    </li>
  );
};

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
  return (
    <div className="cart open">
      <ul className="list-group m-0 open">
        {orders.map(order => (
          <Order
            key={order.created}
            order={order}
            orderStatus={orderStatus}
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
