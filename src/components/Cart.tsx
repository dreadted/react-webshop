import React from "react";

interface CartProps {
  cart: Cart;
}

const Cart: React.FC<CartProps> = ({ cart }) => {
  const getItems = () => {
    const result: string[] = [];
    for (let [movie, quantity] of cart.items.entries()) {
      result.push(movie.name + ":" + quantity);
    }
    return result.join();
  };
  return <div className="fixed-bottom">{getItems()}</div>;
};

export default Cart;
