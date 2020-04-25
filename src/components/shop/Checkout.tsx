import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

// css
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// api
import { save } from "../../lib/api";

// utils
import { getCurrencyFormat } from "../../lib/utils";

// context
import { errorMessage, OrderContext } from "../contexts/OrderContext";

// components
import CheckoutForm from "./CheckoutForm";
import { CartAction } from "../hooks/useCart";
import CartItems from "./CartItems";
import ModalDialogue from "../common/ModalDialogue";

const Checkout: React.FC = () => {
  const { cart, dispatch, order, setOrder } = useContext(OrderContext);
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
        <Col className="cart px-1 px-md-3 mt-4">
          <ul className="list-group">
            <CartItems />
            <li className="cart-item cart-footer list-group-item d-flex justify-content-between align-items-center flex-wrap p-0">
              <div className="d-flex h5 ml-auto m-3">
                <div className="font-weight-light mr-3">Total:</div>
                <div className="font-weight-bold">
                  {getCurrencyFormat(cart.subTotal)}
                </div>
              </div>
            </li>
          </ul>
          <ModalDialogue
            onConfirm={() => dispatch(CartAction.DELETE)}
            onCancel={() => dispatch(CartAction.HIDE_MODAL)}
            props={cart.modal}
          />
        </Col>
        <Col>
          <CheckoutForm
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
