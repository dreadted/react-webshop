import React, { useState, useContext } from "react";
import { getCurrencyFormat, getOrderIdFormat } from "../../lib/utils";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// context
import { ProductContext } from "../contexts/ProductContext";

// hooks
import { SaveState, useSaveState } from "./hooks/useSaveState";

// components
import OrderRows from "./OrderRows";
import SelectOrderStatus from "./SelectOrderStatus";
import PaymentIcon from "./PaymentIcon";

interface OrderProps {
  order: Order;
  statusFilter: number;
  changeStatus: HandleChange;
  updateItem: UpdateItem;
  saveOrder: (order: Order) => Promise<Order>;
  deleteOrder: (order: Order) => Promise<Order>;
}

const Order: React.FC<OrderProps> = ({
  order,
  statusFilter,
  changeStatus,
  updateItem,
  saveOrder,
  deleteOrder
}) => {
  const { products } = useContext(ProductContext);

  const [openClass, setOpenClass] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<number | undefined>(
    order.status
  );

  const [
    { isDirty, isSaving, isSaved, isDeleting, isDeleted },
    setSaveState
  ] = useSaveState();

  const isVisible = () => {
    return statusFilter === -1 || order.status === statusFilter;
  };

  const onChangeStatus: HandleChange = e => {
    setSaveState(SaveState.DIRTY);
    // changeStatus(e, order); // commented out to delay status change until save
    setSelectedStatus(parseInt(e.target.value));
    if (!openClass) toggleOpen();
  };

  const onChangeItem: HandleChange = (e, params) => {
    setSaveState(SaveState.DIRTY);
    updateItem(params);
  };

  const onSubmit: HandleClick = async (order: Order) => {
    setSaveState(SaveState.SAVING);
    if (selectedStatus !== order.status) {
      changeStatus(selectedStatus, order);
      toggleOpen();
    }
    const response = await saveOrder(order);
    if (response && response.status && [200, 204].includes(response.status)) {
      setSaveState(SaveState.SAVED);
    }
  };

  const onDelete: HandleClick = async (order: Order) => {
    setSaveState(SaveState.DELETING);
    deleteOrder(order);
  };

  const onClick: HandleClick = e => {
    if (!e.target.className.includes("badge-select")) toggleOpen();
  };

  const toggleOpen = () => {
    setOpenClass(openClass === "" ? "open" : "");
  };

  const saveButtonClass = () => {
    return isSaved
      ? "btn-success"
      : isDirty
      ? "btn-primary"
      : "btn-outline-secondary";
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

  const Header: React.FC = () => {
    return (
      <>
        <div className="w-20">{getOrderIdFormat(order.id)}</div>
        <div className="badge badge-pill bg-dark w-30 ml-4">
          <SelectOrderStatus
            order={order}
            onChange={onChangeStatus}
            selected={selectedStatus}
          />
        </div>
        <div className="w-40 d-flex flex-wrap justify-content-end">
          <div className="w-50 text-center">
            {new Date(order.created).toLocaleDateString("en-gb")}
          </div>
          <div className="w-50 text-right">
            {getCurrencyFormat(order.totalPrice)}
          </div>
        </div>
        <div className="ml-auto">
          <FontAwesomeIcon icon="angle-up" />
        </div>
      </>
    );
  };

  const Footer: React.FC = () => {
    return (
      <li
        className={`cart-item cart-footer list-group-item d-flex justify-content-between align-items-center flex-wrap p-2 pl-3 m-0 ${openClass}`}
      >
        <div>
          <PaymentIcon name={order.paymentMethod} size="sm" />
        </div>
        <div className="flex-grow-1 overflow-hidden mx-2">
          <small>{order.createdBy}</small>
        </div>
        <div className="w-25">
          <button
            type="button"
            className="w-100 btn btn-danger"
            onClick={() => onDelete(order)}
          >
            {(isDeleting && <FontAwesomeIcon icon="spinner" pulse />) ||
              (isDeleted && <FontAwesomeIcon icon="check" />) ||
              "Delete"}
          </button>
        </div>
        {order.totalPrice ? (
          <div className="w-25 ml-2">
            <button
              type="button"
              className={`w-100 btn ${saveButtonClass()}`}
              disabled={!isDirty}
              onClick={() => onSubmit(order)}
            >
              {(isSaving && <FontAwesomeIcon icon="spinner" pulse />) ||
                (isSaved && <FontAwesomeIcon icon="check" />) ||
                "Save"}
            </button>
          </div>
        ) : undefined}
      </li>
    );
  };

  return (
    <>
      {isVisible() && (
        <li className="list-group-item p-0 mb-4">
          <ul className="list-group">
            <li
              className={`cart-header toggle list-group-item d-flex align-items-center justify-content-between ${openClass}`}
              onClick={onClick}
            >
              <Header />
            </li>
            <OrderRows
              items={toCartItems(order.orderRows)}
              editable={true}
              onChange={onChangeItem}
              updateParams={{ order }}
              openClass={openClass}
            />
            <Footer />
          </ul>
        </li>
      )}
    </>
  );
};

export default Order;
