import React, { useContext } from "react";

// context
import { OrderContext } from "../contexts/OrderContext";
import { CartAction } from "../hooks/useCart";

// components
import CartItem from "../common/CartItem";

const CartItems: React.FC = () => {
  const { cart, dispatch } = useContext(OrderContext);

  const onChangeItem: HandleChange = (e, params) => {
    const { item, quantity } = params;
    if (item && quantity !== undefined)
      dispatch(CartAction.UPDATE, { product: item.product, quantity });
  };

  const result = [];
  for (let [product, quantity] of cart.items.entries()) {
    result.push(
      <CartItem
        key={product.id}
        item={{ product, quantity }}
        editable={true}
        onChange={onChangeItem}
        updateParams={{}}
      />
    );
  }
  return <>{result}</>;
};

export default CartItems;
