import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

// components
import Cart from "./Cart";
import CheckoutForm from "./CheckoutForm";
import { saveOrder } from "../api";
import Confirmation from "./Confirmation";

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

  const [order, setOrder] = useState<Order>({
    companyId: 0,
    created: new Date().toISOString(),
    createdBy: "",
    paymentMethod: "",
    totalPrice: cart.subTotal,
    status: 0
  });

  const history = useHistory();

  useEffect(() => {
    if (!cart.subTotal) history.push("/");
  }, [history, cart]);

  const handleSubmit: HandleSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target);

    if (!formIsValid(formData)) {
      return;
    }

    const values: { [key: string]: string } = {};
    for (let [key, value] of formData.entries()) {
      console.log("key:", key, "value:", value, "type:", typeof value);

      const k = key as string;
      const v = value as string;
      values[k] = v;
    }

    console.log("values:", values);
    console.log("order:", { ...order, ...values, totalPrice: cart.subTotal });

    const newOrder = { ...order, ...values, totalPrice: cart.subTotal };
    submitOrder(newOrder);

    // setOrder(newOrder);
    // console.log("response:", saveOrder(newOrder));
    // console.log("order rows:", getOrderRows());

    // setOrder({ ...order, totalPrice: cart.subTotal });
    // console.log("färdig order:", order, getOrderRows());
    // console.log("response:", saveOrder(order));
    // history.push("/");
  };

  const formIsValid = (formData: FormData) => {
    const err: OrderErrors = {};
    const email = formData.get("createdBy") as string;

    if (!emailIsValid(email))
      err.createdBy = "Please provide correct e-mail address!";

    if (!formData.get("companyId")) err.companyId = "Please select company!";

    if (!formData.get("paymentMethod"))
      err.paymentMethod = "Please select payment method!";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const emailIsValid = (input: string) => {
    const format = /^\w+([.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return input.match(format);
  };

  const submitOrder = async (newOrder: Order) => {
    const savedOrder: Order = await saveOrder(newOrder);
    console.log("newOrder:", newOrder, "savedOrder:", savedOrder);
    setOrder(savedOrder);
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
          <CheckoutForm onSubmit={handleSubmit} errors={errors} />
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
      <div className="row">
        <div className="col mt-4">
          <Confirmation order={order} />
        </div>
      </div>
    </>
  );
};

export default Checkout;
