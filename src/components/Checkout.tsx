import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

// api
import { save } from "../lib/api";

// components
import Cart from "./Cart";
import CheckoutForm from "./CheckoutForm";

interface CheckoutProps {
  cart: Cart;
  order: Order;
  companies: Company[];
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

  useEffect(() => {
    if (cart.open) toggleCart();
    window.scrollTo(0, 0);
  }, [cart.open, toggleCart]);

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
    const newOrder = {
      ...order,
      ...values,
      totalPrice: cart.subTotal,
      orderRows: getOrderRows(order)
    };
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

  const submitOrder = async (createdOrder: Order) => {
    console.log("createdOrder:", JSON.stringify(createdOrder));
    const savedOrder: Order = await save<Order>(createdOrder, "orders");
    console.log("savedOrder:", JSON.stringify(savedOrder));
    setOrder({ ...savedOrder });
    history.push("/confirmation");
  };

  const getOrderRows = (_order: Order) => {
    const result = [];
    for (let [product, quantity] of cart.items.entries()) {
      const orderRow: OrderRow = {
        productId: product.id,
        orderId: _order?.id,
        amount: quantity
      };
      result.push(orderRow);
    }
    return result;
  };

  return (
    <>
      <div className="row row-cols-1 row-cols-md-2">
        <div className="col mt-2 p-0">
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
