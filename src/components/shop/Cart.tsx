import React, { useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

// css
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Collapse from "react-bootstrap/Collapse";

// context
import { OrderContext } from "../contexts/OrderContext";

//components
import CartItems from "./CartItems";
import ModalDialogue from "../common/ModalDialogue";

// utils
import { getCurrencyFormat } from "../../lib/utils";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// hooks
import { CartAction } from "../hooks/useCart";

const Cart: React.FC = () => {
  const { cart, dispatch } = useContext(OrderContext);
  const cartRef = useRef<HTMLDivElement>(null);

  const scrollToCart = () => {
    if (cart.open && cartRef && cartRef.current)
      cartRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToCart, [cart.open]);

  const classOpen = () => {
    return cart.open ? "open" : "";
  };

  const classBlink = () => {
    return cart.blink ? "blink" : "";
  };

  const classCaption = () => {
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
      <div
        className={`toggle p-0 d-flex align-items-center  ${classOpen()}`}
        onClick={() => dispatch(CartAction.TOGGLE)}
      >
        <div className="d-flex m-3 py-1 align-items-center flex-nowrap h5">
          <div>
            <FontAwesomeIcon icon="shopping-cart" />
          </div>
          <div className={`ml-2 font-weight-bold ${classCaption()}`}>
            Shopping cart
          </div>
        </div>
        <div className="ml-4">
          <Thumbnails />
        </div>
        <div className="ml-auto mr-4">
          <FontAwesomeIcon icon="angle-up" size="lg" />
        </div>
      </div>
    );
  };

  const Footer: React.FC = () => {
    return (
      <>
        {cart.articles ? (
          <li className="cart-item cart-footer list-group-item d-flex justify-content-between align-items-center flex-wrap p-0">
            <div className="d-flex h5 ml-auto m-3">
              <div className="font-weight-light mr-3">Total:</div>
              <div className="font-weight-bold">
                {getCurrencyFormat(cart.subTotal)}
              </div>
            </div>
            <div className="m-2">
              <Link to={"/checkout"} className="btn btn-primary">
                Check Out
                <FontAwesomeIcon
                  icon="angle-right"
                  size="lg"
                  className="ml-2"
                />
              </Link>
            </div>
          </li>
        ) : undefined}
      </>
    );
  };

  return (
    <Row className={`${cart.open ? "" : "fixed-bottom px-3"}`}>
      <Col className="px-0">
        <div className="cart" id="cart" ref={cartRef}>
          <div className={`cart-header ${classBlink()}`}>
            <Header />
          </div>
          <Collapse in={cart.open}>
            <ul className="list-group list-group-flush">
              <CartItems />
              <Footer />
            </ul>
          </Collapse>
        </div>
        <ModalDialogue
          onConfirm={() => dispatch(CartAction.DELETE)}
          onCancel={() => dispatch(CartAction.HIDE_MODAL)}
          props={cart.modal}
        />
      </Col>
    </Row>
  );
};

export default Cart;
