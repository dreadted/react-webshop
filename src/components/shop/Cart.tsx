import React, { useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

// context
import { OrderContext } from "../contexts/OrderContext";

//components
import CartItems from "./CartItems";

// utils
import { getCurrencyFormat } from "../../lib/utils";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CartAction } from "../hooks/useCart";
import ModalDialogue from "../common/ModalDialogue";

interface CartProps {
  atCheckout: boolean;
}

const Cart: React.FC<CartProps> = ({ atCheckout }) => {
  const { cart, dispatch } = useContext(OrderContext);
  const cartRef = useRef<HTMLDivElement>(null);

  const scrollToCart = () => {
    if (cart.open && cartRef && cartRef.current)
      cartRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToCart, [cart.open]);

  const classOpen = () => {
    return cart.open || atCheckout ? "open" : "";
  };

  const classBlink = () => {
    return cart.blink ? "blink" : "";
  };

  const classHeader = () => {
    return (
      !cart.open &&
      (cart.items.size ? " d-none d-sm-none" : "") +
        (cart.items.size > 2 ? " d-md-none" : " d-md-block") +
        (cart.items.size > 3 ? " d-lg-none" : " d-lg-block") +
        (cart.items.size > 6 ? " d-xl-none" : " d-xl-block")
    );
  };

  const Thumbnails: React.FC = () => {
    const result = [];
    for (let [product, quantity] of cart.items.entries()) {
      result.push(
        <div
          key={product.id}
          className="py-1 py-0-sm d-flex align-items-center"
        >
          <div>
            <img
              className="thumbnail"
              src={product.imageUrl}
              alt={product.name}
            />
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
        <div className="d-flex m-3 py-1 align-items-center flex-nowrap h5">
          <div>
            <FontAwesomeIcon icon="shopping-cart" />
          </div>
          <div className={`ml-2 font-weight-bold ${classHeader()}`}>
            Shopping cart
          </div>
        </div>
        <div className="ml-4">
          <Thumbnails />
        </div>
        <div className="ml-auto mr-4">
          <FontAwesomeIcon icon="angle-up" size="lg" />
        </div>
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
            <div className="d-flex h5 ml-auto my-0 mr-3">
              <div className="font-weight-light mr-3">Total:</div>
              <div className="font-weight-bold">
                {getCurrencyFormat(cart.subTotal)}
              </div>
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
        ) : undefined}
      </>
    );
  };

  return (
    <>
      <div className="cart-offset" ref={cartRef}></div>
      <div className="cart" id="cart">
        <ul className={`list-group ${cart.open ? "" : "mx-3 m-md-3"}`}>
          {
            !atCheckout && (
              <li
                onClick={() => dispatch(CartAction.TOGGLE)}
                className={`toggle p-0 list-group-item d-flex align-items-center
          ${classOpen()} ${classBlink()}`}
              >
                <Header />
              </li>
            ) // om jag lägger <li> i <Header /> funkar inte .toggle { transition:... }
          }
          <CartItems openClass={classOpen()} />
          <Footer />
        </ul>
      </div>
      <ModalDialogue
        onConfirm={() => dispatch(CartAction.DELETE)}
        onCancel={() => dispatch(CartAction.HIDE_MODAL)}
        props={cart.modal}
      />
    </>
  );
};

export default Cart;
