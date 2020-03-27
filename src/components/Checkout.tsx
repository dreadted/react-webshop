import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// components
import Cart from "./Cart";
import CheckoutForm from "./CheckoutForm";
import { saveOrder } from "../api";

interface CheckoutProps {
  cart: Cart;
  updateCart: UpdateCart;
  toggleCart: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({
  cart,
  updateCart,
  toggleCart
}) => {
  const [errors, setErrors] = useState<OrderErrors>({
    companyId: "",
    createdBy: "",
    paymentMethod: ""
  });

  const [order, setOrder] = useState({
    companyId: 0,
    created: new Date().toISOString(),
    createdBy: "",
    paymentMethod: "",
    totalPrice: cart.subTotal,
    status: 0
  });

  const history = useHistory();

  const handleChange: HandleChange = e => {
    const name: string = e.target.name;
    if (name === "companyId") {
      const value: number = parseInt(e.target.value);
      setOrder({ ...order, companyId: value });
    } else setOrder({ ...order, [e.target.name]: e.target.value });
    console.log(e.target.name, e.target.value, "order", order, "cart", cart);
  };

  const handleSubmit: HandleSubmit = e => {
    e.preventDefault();
    if (!formIsValid()) {
      return;
    }
    setOrder({ ...order, totalPrice: cart.subTotal });
    console.log("färdig order:", order, getOrderRows());
    console.log("response:", saveOrder(order));
    history.push("/");
  };

  const formIsValid = () => {
    const err: OrderErrors = {};
    if (!order.companyId) err.companyId = "Please select company!";
    if (!order.createdBy) err.createdBy = "E-mail is missing!";
    if (!order.paymentMethod)
      err.paymentMethod = "Please select payment method!";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const getOrderRows = () => {
    const result = [];
    for (let [movie, quantity] of cart.items.entries()) {
      const orderRow: OrderRow = { productId: movie.id, amount: quantity };
      result.push(orderRow);
    }
    return result;
  };
  return (
    <>
      <div className="top-margin-sm d-none d-sm-block"></div>
      <div className="top-margin-xs d-block d-sm-none"></div>
      <div className="row">
        <div className="col">
          <CheckoutForm
            cart={cart}
            order={order}
            onChange={handleChange}
            onSubmit={handleSubmit}
            errors={errors}
          />
        </div>
        <div className="col">
          <Cart
            cart={cart}
            updateCart={updateCart}
            toggleCart={toggleCart}
            atCheckout={true}
          />
        </div>
      </div>
    </>
  );
};

export default Checkout;
