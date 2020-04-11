import React, { useEffect, useContext } from "react";
import { getCurrencyFormat } from "../../lib/utils";

// context
import { OrderContext } from "../contexts/OrderContext";

// components
import OrderItems from "../admin/OrderItems";

interface ConfirmationProps {
  cart: Cart;
  resetCart: () => void;
  order: Order;
}

const Confirmation: React.FC<ConfirmationProps> = ({
  cart,
  resetCart,
  order
}) => {
  const { companies } = useContext(OrderContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validateOrder = () => {
    let error = "";
    if (order.orderRows) {
      if (order.orderRows?.length !== cart.items.size)
        error = "Order contains wrong number of items.";
      let counter = 0;
      for (let [product, quantity] of cart.items.entries()) {
        const orderRow = order.orderRows[counter];
        if (
          !(product.id === orderRow.productId && quantity === orderRow.amount)
        )
          error = `Order contains wrong quantity of "${product.name}": ${orderRow.amount} should be ${quantity}!`;
        counter++;
      }
    } else error = "Order is empty!";

    if (!error) {
      resetCart();
      return "";
    } else return <div className="alert alert-danger mt-4 mb-0">{error}</div>;
  };
  return (
    <>
      <div className="row">
        <h1 className="m-4 text-secondary">Order confirmation</h1>
      </div>
      <div className="row">
        <div className="col col-12 col-lg-6 mb-4">
          <div className="cart open">
            <ul className="list-group open">
              <OrderItems order={order} />
              <li className="cart-item cart-footer list-group-item d-flex justify-content-end open">
                <div className="font-weight-bold d-flex m-0">
                  <div className="font-weight-light mr-3">Total:</div>
                  <div>{getCurrencyFormat(order.totalPrice)}</div>
                </div>
              </li>
            </ul>
          </div>
          {validateOrder()}
        </div>
        <div className="col">
          <div className="cart open">
            <ul className="list-group open m-0">
              <li className="cart-item list-group-item d-flex align-items-center justify-content-between open">
                <div className="font-weight-light">order #</div>
                <div>{order.id}</div>
              </li>
              <li className="cart-item list-group-item d-flex align-items-center justify-content-between open">
                <div className="font-weight-light">customer</div>
                <div>
                  {companies.map(company => {
                    return company.id === order.companyId
                      ? company.name
                      : undefined;
                  })}
                </div>
              </li>
              <li className="cart-item list-group-item d-flex align-items-center justify-content-between open">
                <div className="font-weight-light">order created</div>
                <div className="text-nowrap">
                  {new Date(order.created).toLocaleString("en-gb")}
                </div>
              </li>
              <li className="cart-item list-group-item d-flex align-items-center justify-content-between open">
                <div className="font-weight-light">e-mail</div>
                <div>{order.createdBy}</div>
              </li>
              <li className="cart-item list-group-item d-flex align-items-center justify-content-between open">
                <div className="font-weight-light">payment method</div>
                <div>{order.paymentMethod}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Confirmation;
