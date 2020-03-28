import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

//components
import CartItems from "./CartItems";

// lib
import { getCurrencyFormat } from "../utils";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface CartProps {
  cart: Cart;
  updateCart: UpdateCart;
  toggleCart: () => void;
  atCheckout: boolean;
}

const Cart: React.FC<CartProps> = ({
  cart,
  updateCart,
  toggleCart,
  atCheckout
}) => {
  const pageBottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (cart.open && !atCheckout && pageBottomRef && pageBottomRef.current)
      pageBottomRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [cart.open]);

  const classOpen = () => {
    return cart.open ? "open" : "";
  };

  const classBlink = () => {
    return cart.blink ? "blink" : "";
  };

  const Thumbnails: React.FC = () => {
    const result = [];
    for (let [movie, quantity] of cart.items.entries()) {
      result.push(
        <div key={movie.id} className="py-1 py-0-sm d-flex align-items-center">
          <div>
            <img className="thumbnail" src={movie.imageUrl} alt={movie.name} />
          </div>
          <div className={`label badge badge-pill`}>{quantity}</div>
        </div>
      );
    }
    return <div className="d-flex flex-wrap">{result}</div>;
  };

  const Header: React.FC = () => {
    return (
      <>
        {!atCheckout && (
          <li
            onClick={toggleCart}
            className={`toggle p-0 list-group-item d-flex align-items-center
          ${classOpen()} ${classBlink()}`}
          >
            <div className="d-flex m-3 py-1 align-items-center flex-nowrap h5">
              <div>
                <FontAwesomeIcon icon="shopping-cart" />
              </div>
              <div
                className={`ml-2 font-weight-bold
            ${!cart.open && cart.items.size ? " d-none d-sm-none" : ""} 
            ${!cart.open && cart.items.size > 2 ? " d-md-none" : " d-md-block"}
            `}
              >
                Shopping cart
              </div>
            </div>
            <div className="ml-4">
              <Thumbnails />
            </div>
            <div className="ml-auto mr-4">
              <FontAwesomeIcon icon="angle-up" size="lg" />
            </div>
          </li>
        )}
      </>
    );
  };

  const Footer: React.FC = () => {
    return (
      <>
        {cart.articles ? (
          <li
            className={`cart-item cart-footer list-group-item d-flex justify-content-between align-items-center flex-wrap
        ${classOpen()}`}
          >
            <div className="font-weight-bold d-flex h5 m-0">
              <div className="mr-3">Total:</div>
              <div>{getCurrencyFormat(cart.subTotal)}</div>
            </div>
            <div className="text-right">
              {!atCheckout && (
                <Link to={"/checkout"} className="btn btn-primary">
                  Check Out
                  <FontAwesomeIcon
                    icon="angle-right"
                    size="lg"
                    className="ml-2"
                  />
                </Link>
              )}
            </div>
          </li>
        ) : (
          undefined
        )}
      </>
    );
  };

  return (
    <div className="cart" id="cart">
      <div ref={pageBottomRef}></div>
      <ul className={`list-group ${cart.open ? "" : "m-4"}`}>
        <Header />
        <CartItems
          cart={cart}
          updateCart={updateCart}
          openClass={classOpen()}
        />
        <Footer />
      </ul>
    </div>
  );
};

export default Cart;
