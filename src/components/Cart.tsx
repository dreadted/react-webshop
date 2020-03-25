import React, { useState } from "react";

//components
import CartItem from "./CartItem";

// lib
import { getCurrencyFormat } from "../utils";

// icons
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faShoppingCart,
  faAngleUp,
  faPlusCircle,
  faMinusCircle
} from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(faShoppingCart, faAngleUp, faPlusCircle, faMinusCircle, faTrashAlt);

interface CartProps {
  cart: Cart;
  updateCart: UpdateCart;
}

const Cart: React.FC<CartProps> = ({ cart, updateCart }) => {
  const [openState, setOpenState] = useState<boolean>();

  const handleClick = (e: React.MouseEvent) => {
    toggleOpenState();
  };

  const toggleOpenState = () => {
    setOpenState(!openState);
  };

  const getOpenClass = () => {
    return openState && cart.articles ? "open" : "";
  };

  const getHeader = () => {
    if (cart.articles)
      return (
        <li
          className={`cart-item cart-header list-group-item d-flex justify-content-between font-italic ${getOpenClass()}`}
        >
          <div className="w-25">product</div>
          <div className="w-25 text-center">quantity</div>
          <div className="w-25 text-right">price</div>
          <div className="px-3"></div>
        </li>
      );
  };

  const getItems = () => {
    const result = [];
    for (let [movie, quantity] of cart.items.entries()) {
      result.push(
        <CartItem
          key={movie.id}
          movie={movie}
          quantity={quantity}
          updateCart={updateCart}
          openClass={getOpenClass()}
        />
      );
    }
    return result;
  };

  const getFooter = () => {
    if (cart.articles)
      return (
        <li
          className={`cart-item cart-footer list-group-item d-flex justify-content-between align-items-center flex-wrap
        ${getOpenClass()}`}
        >
          <div className="font-weight-bold d-flex">
            <div className="mr-3">Total:</div>
            <div>{getCurrencyFormat(cart.subTotal)}</div>
          </div>
          <div className="text-right">
            <a href="#" className="btn btn-success">
              Check out
            </a>
          </div>
        </li>
      );
  };

  return (
    <div className="cart fixed-bottom" id="cart">
      <ul className="list-group m-3">
        <li
          onClick={handleClick}
          className={`toggle list-group-item d-flex align-items-center
          ${getOpenClass()}`}
        >
          <div className="d-flex py-1 align-items-center flex-nowrap">
            <div>
              <FontAwesomeIcon icon="shopping-cart" />
            </div>
            <div className="ml-2 font-weight-bold">Shopping cart</div>
          </div>
          <div className="ml-4"></div>
          <div className="ml-auto">
            <FontAwesomeIcon icon="angle-up" size="lg" />
          </div>
        </li>
        {getHeader()}
        {getItems()}
        {getFooter()}
      </ul>
    </div>
  );
};

export default Cart;
