import React from "react";
import { getCurrencyFormat } from "../utils";

interface OrderItemsProps {
  order: Order;
  movies: Movie[];
}

const OrderItems: React.FC<OrderItemsProps> = ({ order, movies }) => {
  return (
    <>
      <li className="cart-item list-group-item d-flex justify-content-between font-italic open">
        <div className="w-50">product</div>
        <div className="w-25 text-center">quantity</div>
        <div className="w-25 text-right">price</div>
      </li>
      {order.orderRows?.map(item => {
        const movie = movies.find(movie => movie.id === item.productId);
        return (
          <li
            key={movie?.id}
            className="cart-item list-group-item d-flex align-items-center justify-content-between open h5 m-0"
          >
            <div className="w-50 d-flex align-items-center">
              <div className="mr-3">
                <img
                  className="thumbnail"
                  src={movie?.imageUrl}
                  alt={movie?.name}
                />
              </div>
              <div>{movie?.name}</div>
            </div>
            <div className="w-25 text-center">{item.amount}</div>
            <div className="w-25 text-right">
              {getCurrencyFormat(movie ? movie.price * item.amount : 0)}
            </div>
          </li>
        );
      })}
    </>
  );
};

export default OrderItems;
