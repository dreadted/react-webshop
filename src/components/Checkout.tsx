import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

// components
import Cart from "./Cart";
import CheckoutForm from "./CheckoutForm";
import { save } from "../api";

interface CheckoutProps {
  cart: Cart;
  order: Order;
  companies: string[];
  setOrder: React.Dispatch<React.SetStateAction<Order>>;
  updateCart: UpdateCart;
  toggleCart: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({
  cart,
  order,
  companies,
  setOrder,
  updateCart,
  toggleCart
}) => {
  const [errors, setErrors] = useState<OrderErrors>({
    companyId: "",
    createdBy: "",
    paymentMethod: ""
  });

  const history = useHistory();

  useEffect(() => {
    if (!cart.subTotal) history.push("/");
  }, [history, cart]);

  const handleSubmit: HandleSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target);

    if (!formIsValid(formData)) return;

    const values: { [key: string]: string } = {
      created: new Date().toISOString()
    };

    for (let [key, value] of formData.entries()) {
      const k = key as string;
      const v = value as string;
      values[k] = v;
    }

    delete order.id; // important!
    const newOrder = { ...order, ...values, totalPrice: cart.subTotal };
    submitOrder(newOrder);
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
    const format = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return input.match(format);
  };

  const submitOrder = async (newOrder: Order) => {
    const savedOrder: Order = await save<Order>(newOrder, "orders");
    const updatedOrder: Order = {
      ...savedOrder,
      orderRows: getOrderRows(savedOrder)
    };
    const response = await save<Order>(updatedOrder, "orders", updatedOrder.id);
    console.log(
      "updatedOrder:",
      updatedOrder,
      JSON.stringify(updatedOrder),
      "response:",
      response
    );
    setOrder({ ...updatedOrder });
    history.push("/confirmation");
  };

  const getOrderRows = (_order: Order) => {
    const result = [];
    for (let [movie, quantity] of cart.items.entries()) {
      const orderRow: OrderRow = {
        productId: movie.id,
        orderId: _order.id,
        amount: quantity
      };
      result.push(orderRow);
    }
    return result;
  };
  return (
    <>
      <div className="top-margin-sm d-none d-sm-block"></div>
      <div className="top-margin-xs d-block d-sm-none"></div>
      <div className="row row-cols-1 row-cols-md-2">
        <div className="col my-4">
          <Cart
            cart={cart}
            updateCart={updateCart}
            toggleCart={toggleCart}
            atCheckout={true}
          />
        </div>
        <div className="col">
          <CheckoutForm
            onSubmit={handleSubmit}
            errors={errors}
            companies={companies}
          />
        </div>
      </div>
    </>
  );
};

export default Checkout;
