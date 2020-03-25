import React, { ChangeEvent } from "react";
import { getCurrencyFormat } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface CartItemProps {
  movie: Movie;
  quantity: number;
  updateCart: UpdateCart;
  openClass: string;
}

const CartItem: React.FC<CartItemProps> = ({
  movie,
  quantity,
  updateCart,
  openClass
}) => {
  return (
    <li
      className={`cart-item list-group-item d-flex align-items-center justify-content-between ${openClass}`}
    >
      <div className="w-25">{movie.name}</div>
      <div className="w-25">
        <div className="d-flex align-items-center justify-content-between">
          <div
            className="update"
            onClick={() => updateCart(movie, quantity - 1)}
          >
            <FontAwesomeIcon icon="minus-circle" />
          </div>
          <input
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              updateCart(movie, parseInt(e.target.value))
            }
            inputMode="numeric"
            pattern="[0-9]*"
            type="text"
            name="quantity"
            value={quantity}
          />
          <div
            className="update"
            onClick={() => updateCart(movie, quantity + 1)}
          >
            <FontAwesomeIcon icon="plus-circle" />
          </div>
        </div>
      </div>
      <div className="w-25 text-right">
        {getCurrencyFormat(movie.price * quantity)}
      </div>
      <div className="update text-right" onClick={() => updateCart(movie, 0)}>
        <FontAwesomeIcon icon={["far", "trash-alt"]} />
      </div>
    </li>
  );
};

export default CartItem;
