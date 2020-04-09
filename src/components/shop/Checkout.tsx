import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

// api
import { save } from "../../lib/api";

// components
import Cart from "./Cart";
import CheckoutForm from "./CheckoutForm";

interface CheckoutProps {
  cart: Cart;
  order: Order;
  setOrder: React.Dispatch<React.SetStateAction<Order>>;
  updateCart: UpdateCart;
  toggleCart: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({
  cart,
  order,
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

    if (!isValidForm()) return;

    delete order.id; // important!
    const newOrder = {
      ...order,
      created: new Date().toISOString(),
      totalPrice: cart.subTotal,
      orderRows: getOrderRows(order)
    };

    submitOrder(newOrder);
  };

  const isValidForm = () => {
    const err: OrderErrors = {};
    if (!isValidEmail())
      err.createdBy = "Please provide correct e-mail address!";
    if (!order.companyId) err.companyId = "Please select company!";
    if (!order.paymentMethod)
      err.paymentMethod = "Please select payment method!";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const isValidEmail = () => {
    const format = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return order.createdBy.match(format) ? true : false;
  };

  const submitOrder = async (createdOrder: Order) => {
    console.log("createdOrder:", JSON.stringify(createdOrder));
    const response = await save<Order>(createdOrder, "orders");
    console.log("response:", response);

    if (response.status === 201) {
      const savedOrder: Order = response.data;
      console.log("savedOrder:", JSON.stringify(savedOrder));
      setOrder({ ...savedOrder });
      history.push("/confirmation");
    }
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
            order={order}
            setOrder={setOrder}
            errors={errors}
            setErrors={setErrors}
            isValidEmail={isValidEmail}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </>
  );
};

export default Checkout;
