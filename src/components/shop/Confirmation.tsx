import React, { useEffect, useContext, useState } from "react";
import { getCurrencyFormat, getOrderIdFormat } from "../../lib/utils";

// css
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// context
import { OrderContext } from "../contexts/OrderContext";

// components
import { CartAction } from "../hooks/useCart";
import OrderRows from "../common/OrderRows";

const Confirmation: React.FC = () => {
  const { companies, cart, dispatch, order } = useContext(OrderContext);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const validateOrder = () => {
      let message = "";
      if (order.orderRows) {
        if (order.orderRows?.length !== cart.items.size)
          message = "Order contains wrong number of items.";
        let counter = 0;
        for (let [product, quantity] of cart.items.entries()) {
          const orderRow = order.orderRows[counter];
          if (
            !(product.id === orderRow.productId && quantity === orderRow.amount)
          )
            message = `Order contains wrong quantity of "${product.name}": ${orderRow.amount} should be ${quantity}!`;
          counter++;
        }
      } else message = "Order is empty!";

      if (!message) {
        dispatch(CartAction.RESET);
        return "";
      } else setError(message);
    };
    if (cart.items.size) validateOrder();
  }, [cart.items, dispatch, order.orderRows]);

  return (
    <>
      <Row>
        <h1 className="m-4 text-secondary">Order confirmation</h1>
      </Row>
      <Row>
        <Col xs={12} lg={6} className="px-1 px-md-3 mb-4">
          <div className="cart">
            <ul className="list-group">
              <OrderRows
                editable={false}
                onChange={() => {}}
                updateParams={{ order }}
              />
              <li className="cart-item cart-footer h5 list-group-item d-flex justify-content-end">
                <div className="font-weight-bold d-flex m-0">
                  <div className="font-weight-light mr-3">Total:</div>
                  <div>{getCurrencyFormat(order.totalPrice)}</div>
                </div>
              </li>
            </ul>
          </div>
          {!!error && (
            <div className="alert alert-danger mt-4 mb-0">{error}</div>
          )}
        </Col>
        <Col className="px-1 px-md-3">
          <div className="cart">
            <ul className="list-group open m-0">
              <li className="cart-item list-group-item d-flex align-items-center justify-content-between">
                <div className="font-weight-light">order #</div>
                <div>{getOrderIdFormat(order.id)}</div>
              </li>
              <li className="cart-item list-group-item d-flex align-items-center justify-content-between">
                <div className="font-weight-light">customer</div>
                <div>
                  {companies.map(company => {
                    return company.id === order.companyId
                      ? company.name
                      : undefined;
                  })}
                </div>
              </li>
              <li className="cart-item list-group-item d-flex align-items-center justify-content-between">
                <div className="font-weight-light">order created</div>
                <div className="text-nowrap">
                  {new Date(order.created).toLocaleString("en-gb")}
                </div>
              </li>
              <li className="cart-item list-group-item d-flex align-items-center justify-content-between">
                <div className="font-weight-light">e-mail</div>
                <div>{order.createdBy}</div>
              </li>
              <li className="cart-item list-group-item d-flex align-items-center justify-content-between">
                <div className="font-weight-light">payment method</div>
                <div>{order.paymentMethod}</div>
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Confirmation;
