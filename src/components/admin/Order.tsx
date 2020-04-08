import React, { useState, useEffect } from "react";
import { getCurrencyFormat } from "../../lib/utils";
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
  statusFilter: number;
  changeStatus: HandleChange;
  products: Product[];
  updateItem: UpdateItem;
  saveOrder: (order: Order) => Promise<Order>;
  deleteOrder: (order: Order) => Promise<Order>;
}

const Order: React.FC<OrderProps> = ({
  order,
  statusFilter,
  changeStatus,
  products,
  updateItem,
  saveOrder,
  deleteOrder
}) => {
  const [openClass, setOpenClass] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<number | undefined>(
    order.status
  );
  const [isDirty, setDirty] = useState<boolean>(false);
  const [isSaving, setSaving] = useState<boolean>(false);
  const [isSaved, setSaved] = useState<boolean>(false);
  const [isDeleting, setDeleting] = useState<boolean>(false);
  const [isDeleted, setDeleted] = useState<boolean>(false);

  const isVisible = () => {
    return statusFilter === -1 || order.status === statusFilter;
  };

  useEffect(() => {
    if (isSaved) {
      setTimeout(() => setSaved(false), 1000);
    }
  }, [isSaved]);

  useEffect(() => {
    if (isDeleted) {
      setTimeout(() => setDeleted(false), 1000);
    }
  }, [isDeleted]);

  useEffect(() => {
    if (isSaving && isSaved) setSaving(false);
  }, [isSaving, isSaved]);

  useEffect(() => {
    if (isDeleting && isDeleted) setDeleting(false);
  }, [isDeleting, isDeleted]);

  const onChangeStatus: HandleChange = e => {
    setSaved(false);
    setDirty(true);
    // changeStatus(e, order); // commented out to delay status change until save
    setSelectedStatus(parseInt(e.target.value));
    if (!openClass) toggleOpen();
  };

  const onChangeItem: HandleChange = (e, params) => {
    setSaved(false);
    setDirty(true);
    updateItem(params);
  };

  const onSubmit: HandleClick = async (order: Order) => {
    setSaving(true);
    if (selectedStatus !== order.status) {
      changeStatus(selectedStatus, order);
      toggleOpen();
    }
    const response = await saveOrder(order);
    if (response && response.status && [200, 204].includes(response.status)) {
      setSaved(true);
      setDirty(false);
    }
  };

  const onDelete: HandleClick = async (order: Order) => {
    setDeleting(true);
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

  const getPaymentIcon = (name: string) => {
    const icon = PAY_METHODS.find(
      i => i.name.toLowerCase() === name.toLowerCase()
    );
    if (icon) return <FontAwesomeIcon icon={["fab", icon.icon]} size="lg" />;
    return undefined;
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
              <div className="w-30 d-flex flex-wrap">
                <div className="w-50">{order.id}</div>
                <div className="text-center">
                  {new Date(order.created).toLocaleDateString("en-gb")}
                </div>
              </div>
              <div className="badge badge-pill bg-dark w-30 ml-4">
                <SelectOrderStatus
                  order={order}
                  onChange={onChangeStatus}
                  selected={order.status}
                />
              </div>
              <div className="w-20 text-right">
                {getCurrencyFormat(order.totalPrice)}
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
          </ul>
        </li>
      )}
    </>
  );
};

export default Order;
