import React, { useEffect } from "react";
import { getCurrencyFormat } from "../utils";

// components
import OrderItems from "./OrderItems";

interface ConfirmationProps {
  cart: Cart;
  order: Order;
  movies: Movie[];
  companies: string[];
}

const Confirmation: React.FC<ConfirmationProps> = ({
  cart,
  order,
  movies,
  companies
}) => {
  console.log("order:", order);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validateOrder = () => {
    let error = "";
    if (order.orderRows) {
      if (order.orderRows?.length !== cart.items.size)
        error = "Order contains wrong number of items.";
      let counter = 0;
      for (let [movie, quantity] of cart.items.entries()) {
        const orderRow = order.orderRows[counter];
        if (!(movie.id === orderRow.productId && quantity === orderRow.amount))
          error = `Order contains wrong quantity of "${movie.name}": ${orderRow.amount} should be ${quantity}!`;
        counter++;
      }
    } else error = "Order is empty!";

    if (!error) {
      resetCart();
      return "";
    } else return <div className="alert alert-danger mt-4 mb-0">{error}</div>;
  };

  const resetCart = () => {
    cart.items.clear();
    cart.articles = 0;
    cart.subTotal = 0;
    cart.open = false;
    localStorage.removeItem("cart");
    localStorage.removeItem("items");
  };

  return (
    <>
      <div className="top-margin"></div>
      <div className="row">
        <h1 className="m-4 text-secondary h2 font-weight-light">
          Order confirmation
        </h1>
      </div>
      <div className="row">
        <div className="col col-12 col-lg-6 mb-4">
          <div className="cart open">
            <ul className="list-group open">
              <OrderItems order={order} movies={movies} />
              <li className="cart-item cart-footer list-group-item d-flex justify-content-end open">
                <div className="font-weight-bold d-flex h5 m-0">
                  <div className="mr-3">Total:</div>
                  <div>{getCurrencyFormat(order.totalPrice)}</div>
                </div>
              </li>
            </ul>
          </div>
          {validateOrder()}
        </div>
        <div className="col">
          <div className="cart open">
            <ul className="list-group open h5 m-0">
              <li className="cart-item list-group-item d-flex align-items-center justify-content-between open">
                <div>order #</div>
                <div>{order.id}</div>
              </li>
              <li className="cart-item list-group-item d-flex align-items-center justify-content-between open">
                <div>customer</div>
                <div>{companies[order.companyId]}</div>
              </li>
              <li className="cart-item list-group-item d-flex align-items-center justify-content-between open">
                <div>order created</div>
                <div className="text-nowrap">
                  {new Date(order.created).toLocaleString("en-gb")}
                </div>
              </li>
              <li className="cart-item list-group-item d-flex align-items-center justify-content-between open">
                <div>e-mail</div>
                <div>{order.createdBy}</div>
              </li>
              <li className="cart-item list-group-item d-flex align-items-center justify-content-between open">
                <div>payment method</div>
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
