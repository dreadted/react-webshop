import React, { useRef, useEffect } from "react";

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
  toggleCart: () => void;
}

const Cart: React.FC<CartProps> = ({ cart, updateCart, toggleCart }) => {
  const pageBottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (cart.open && pageBottomRef && pageBottomRef.current)
      pageBottomRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [cart.open]);

  const getOpenClass = () => {
    return cart.open ? "open" : "";
  };

  const getBlinkClass = () => {
    return cart.blink ? "blink" : "";
  };

  const getThumbnails = () => {
    const result = [];
    for (let [movie, quantity] of cart.items.entries()) {
      result.push(
        <div className="py-1 py-0-sm">
          <img className="thumbnail" src={movie.imageUrl} alt={movie.name} />
          <span className="label">{quantity}</span>
        </div>
      );
    }
    return <div className="d-flex flex-wrap">{result}</div>;
  };

  const getHeader = () => {
    return (
      <li
        onClick={toggleCart}
        className={`toggle list-group-item d-flex align-items-center
          ${getOpenClass()} ${getBlinkClass()}`}
      >
        <div className="d-flex py-1 align-items-center flex-nowrap">
          <div>
            <FontAwesomeIcon icon="shopping-cart" />
          </div>
          <div className="ml-2 font-weight-bold">Shopping cart</div>
        </div>
        <div className="ml-4">{getThumbnails()}</div>
        <div className="ml-auto">
          <FontAwesomeIcon icon="angle-up" size="lg" />
        </div>
      </li>
    );
  };

  const getCaptions = () => {
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
            <a href="#" className="btn btn-primary">
              Check out
            </a>
          </div>
        </li>
      );
  };

  return (
    <div className={`cart ${cart.open ? "" : "fixed-bottom"}`} id="cart">
      <ul className={`list-group ${cart.open ? "" : "m-4"}`}>
        {getHeader()}
        {/* {getCaptions()} */}
        {getItems()}
        {getFooter()}
      </ul>
      <div ref={pageBottomRef}></div>
    </div>
  );
};

export default Cart;
