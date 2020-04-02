import React, { ChangeEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getCurrencyFormat } from "../lib/utils";

interface OrderRowProps {
  items: CartItem[];
  item: CartItem;
  order: Order;
  editable: boolean;
  updateItem: UpdateItem;
  openClass: string;
}

const OrderRow: React.FC<OrderRowProps> = ({
  items,
  item,
  order,
  editable,
  updateItem,
  openClass
}) => {
  return (
    <>
      <li className={`cart-item list-group-item d-flex px-3 pb-2 ${openClass}`}>
        <div className="mr-3">
          <img
            className="thumbnail"
            src={item.product.imageUrl}
            alt={item.product.name}
          />
        </div>
        <div className="flex-grow-1 d-flex flex-column h5">
          <div>{item.product.name}</div>
          <div className="d-flex align-items-center justify-content-between mt-2">
            <div>
              <div className="d-flex align-items-center justify-content-start">
                {editable && (
                  <div
                    className="update p-2"
                    onClick={() =>
                      updateItem({
                        items,
                        item,
                        order,
                        quantity: item.quantity - 1
                      })
                    }
                  >
                    <FontAwesomeIcon icon="minus-circle" />
                  </div>
                )}
                <div className="font-weight-bold">
                  <input
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      updateItem({
                        items,
                        item,
                        order,
                        quantity: parseInt(e.target.value)
                      })
                    }
                    inputMode="numeric"
                    pattern="[0-9]*"
                    type="text"
                    name="quantity"
                    value={item.quantity}
                    disabled={!editable}
                  />
                </div>
                {editable && (
                  <div
                    className="update p-2"
                    onClick={() =>
                      updateItem({
                        items,
                        item,
                        order,
                        quantity: item.quantity + 1
                      })
                    }
                  >
                    <FontAwesomeIcon icon="plus-circle" />
                  </div>
                )}
              </div>
            </div>
            <div className="w-25 text-right">
              {getCurrencyFormat(item.product.price * item.quantity)}
            </div>
            {editable && (
              <div
                className="update w-25 text-right p-2"
                onClick={() => updateItem({ items, item, order, quantity: 0 })}
              >
                <FontAwesomeIcon icon={["far", "trash-alt"]} />
              </div>
            )}
          </div>
        </div>
      </li>
    </>
  );
};

interface OrderRowsProps {
  order: Order;
  items: CartItem[];
  editable: boolean;
  updateItem: UpdateItem;
  openClass: string;
}

const OrderRows: React.FC<OrderRowsProps> = ({
  order,
  items,
  editable,
  updateItem,
  openClass
}) => {
  return (
    <>
      {items.map(item => {
        return (
          <OrderRow
            key={item.product.id}
            items={items}
            item={item}
            order={order}
            editable={editable}
            updateItem={updateItem}
            openClass={openClass}
          />
        );
      })}
    </>
  );
};

export default OrderRows;