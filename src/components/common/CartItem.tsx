import React, { ChangeEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// utils
import { getCurrencyFormat } from "../../lib/utils";

interface CartItemProps {
  item: CartItem;
  editable: boolean;
  onChange: HandleChange;
  updateParams: UpdateParams;
  openClass: string;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  editable,
  onChange,
  updateParams,
  openClass
}) => {
  return (
    <>
      <li
        className={`cart-item list-group-item d-flex align-items-center px-3 ${openClass}`}
      >
        <div className="mr-3">
          <img
            className="thumbnail"
            src={item.product.imageUrl}
            alt={item.product.name}
          />
        </div>
        <div className="flex-grow-1 d-flex flex-column h5 mb-0">
          <div className="mb-2">{item.product.name}</div>
          <div className="d-flex align-items-center justify-content-between">
            <div
              className={editable ? "bg-secondary text-info rounded-pill" : ""}
            >
              <div className="d-flex align-items-center justify-content-start">
                {(editable && (
                  <div
                    className="update decrease p-1"
                    onClick={e =>
                      onChange(e, {
                        ...updateParams,
                        item,
                        quantity: item.quantity - 1
                      })
                    }
                  >
                    <FontAwesomeIcon icon="minus-circle" />
                  </div>
                )) || <small className="text-lighter">qty :</small>}
                <div className="font-weight-bold">
                  <input
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      e.target.value &&
                      onChange(e, {
                        ...updateParams,
                        item,
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
                    className="update increase p-1"
                    onClick={e =>
                      onChange(e, {
                        ...updateParams,
                        item,
                        quantity: item.quantity + 1
                      })
                    }
                  >
                    <FontAwesomeIcon icon="plus-circle" />
                  </div>
                )}
              </div>
            </div>
            <div className={editable ? "w-25 text-right" : "text-right"}>
              {getCurrencyFormat(item.product.price * item.quantity)}
            </div>
            {editable && (
              <div className="w-25">
                <div
                  className="update ml-auto p-1"
                  onClick={e =>
                    onChange(e, { ...updateParams, item, quantity: 0 })
                  }
                >
                  <FontAwesomeIcon icon={["far", "trash-alt"]} size="sm" />
                </div>
              </div>
            )}
          </div>
        </div>
      </li>
    </>
  );
};

export default CartItem;
