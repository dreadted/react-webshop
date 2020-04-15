import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

// css
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// api
import { save } from "../../lib/api";

// context
import { errorMessage, OrderContext } from "../contexts/OrderContext";

// components
import Cart from "./Cart";
import CheckoutForm from "./CheckoutForm";
import { CartAction } from "../hooks/useCart";

interface CheckoutProps {
  order: Order;
  setOrder: React.Dispatch<React.SetStateAction<Order>>;
}

const Checkout: React.FC<CheckoutProps> = ({ order, setOrder }) => {
  const { cart, dispatch } = useContext(OrderContext);
  const [isSaving, setSaving] = useState<boolean>(false);
  const [errors, setErrors] = useState<OrderErrors>({
    companyId: "",
    createdBy: "",
    paymentMethod: ""
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (cart.open) dispatch(CartAction.TOGGLE);
  }, [cart.open, dispatch]);

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
    if (!isValidEmail()) err.createdBy = errorMessage.createdBy;
    if (!order.companyId) err.companyId = errorMessage.companyId;
    if (!order.paymentMethod) err.paymentMethod = errorMessage.paymentMethod;
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const isValidEmail = () => {
    const format = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return order.createdBy.match(format) ? true : false;
  };

  const submitOrder = async (createdOrder: Order) => {
    setSaving(true);
    console.log("createdOrder:", JSON.stringify(createdOrder));
    const response = await save<Order>(createdOrder, "orders");
    console.log("response:", response);

    if (response.status !== 201) {
      setSaving(false);
      if (response.data && response.data.errors) {
        const messages: string[] = response.data.errors.map(
          (error: any) => error.msg
        );
        console.error("ERROR!", messages.join("\n"));
        setErrors({ ...errors, response: messages.join("\n") });
      } else {
        const message = `${response.status} : ${response.statusText}`;
        setErrors({ ...errors, response: message });
      }
    } else {
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
      <Row xs={1} md={2}>
        <Col className="mt-2 p-0">
          <Cart atCheckout={true} />
        </Col>
        <Col>
          <CheckoutForm
            order={order}
            setOrder={setOrder}
            errors={errors}
            setErrors={setErrors}
            isValidEmail={isValidEmail}
            isSaving={isSaving}
            onSubmit={handleSubmit}
          />
          {!!errors && !!errors.response && (
            <div className="alert alert-danger mt-4 mb-0">
              {errors.response}
            </div>
          )}
        </Col>
      </Row>
    </>
  );
};

export default Checkout;
