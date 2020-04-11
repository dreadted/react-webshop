import React, { useContext } from "react";

// utils
import { getCurrencyFormat } from "../../lib/utils";

// context
import { ProductContext } from "../contexts/ProductContext";

interface OrderItemsProps {
  order: Order;
}

const OrderItems: React.FC<OrderItemsProps> = ({ order }) => {
  const { products } = useContext(ProductContext);

  return (
    <>
      <li className="cart-item list-group-item d-flex justify-content-between font-weight-light open">
        <div className="w-50">product</div>
        <div className="w-25 text-center">quantity</div>
        <div className="w-25 text-right">price</div>
      </li>
      {order.orderRows?.map(item => {
        const product = products.find(product => product.id === item.productId);
        return (
          <li
            key={product?.id}
            className="cart-item list-group-item d-flex align-items-center justify-content-between open m-0"
          >
            <div className="w-50 d-flex align-items-center">
              <div className="mr-3">
                <img
                  className="thumbnail"
                  src={product?.imageUrl}
                  alt={product?.name}
                />
              </div>
              <div>{product?.name}</div>
            </div>
            <div className="w-25 text-center">{item.amount}</div>
            <div className="w-25 text-right">
              {getCurrencyFormat(product ? product.price * item.amount : 0)}
            </div>
          </li>
        );
      })}
    </>
  );
};

export default OrderItems;
