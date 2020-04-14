import React, { useState, useContext } from "react";
import { getCurrencyFormat, getOrderIdFormat } from "../../lib/utils";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// context
import { AdminContext } from "../contexts/AdminContext";

// hooks
import { SaveState, useSaveState } from "./hooks/useSaveState";

// components
import OrderRows from "../common/OrderRows";
import SelectOrderStatus from "./SelectOrderStatus";
import PaymentIcon from "./PaymentIcon";

interface OrderProps {
  order: Order;
}

const Order: React.FC<OrderProps> = ({ order }) => {
  const {
    statusFilter,
    changeOrderStatus,
    updateItem,
    saveOrder,
    deleteOrder
  } = useContext(AdminContext);

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
    setSelectedStatus(parseInt(e.target.value));
    if (!openClass) toggleOpen();
  };

  const onChangeItem: HandleChange = (e, params) => {
    setSaveState(SaveState.DIRTY);
    updateItem(params);
  };

  const onSubmit: HandleClick = async (order: Order) => {
    setSaveState(SaveState.SAVING);
    if (selectedStatus && selectedStatus !== order.status) {
      changeOrderStatus(selectedStatus, order);
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

  const Header: React.FC = () => {
    return (
      <>
        <div className="w-20">{getOrderIdFormat(order.id)}</div>
        <div className="w-30 badge badge-pill bg-dark">
          <SelectOrderStatus
            order={order}
            onChange={onChangeStatus}
            selected={selectedStatus}
          />
        </div>
        <div className="w-40 d-flex flex-wrap align-items-center">
          <div className="ml-4">
            {new Date(order.created).toLocaleDateString("en-gb")}
          </div>
          <div className="ml-auto">{getCurrencyFormat(order.totalPrice)}</div>
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
