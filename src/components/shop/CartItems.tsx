import React, { ChangeEvent } from "react";
import { getCurrencyFormat } from "../../lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface CartItemProps {
  product: Product;
  quantity: number;
  updateCart: UpdateCart;
  openClass: string;
}

const CartItem: React.FC<CartItemProps> = ({
  product,
  quantity,
  updateCart,
  openClass
}) => {
  return (
    <li className={`cart-item list-group-item d-flex px-3 pb-2 ${openClass}`}>
      <div className="mr-3">
        <img className="thumbnail" src={product.imageUrl} alt={product.name} />
      </div>
      <div className="flex-grow-1 d-flex flex-column h5">
        <div>{product.name}</div>
        <div className="d-flex align-items-center justify-content-between mt-2">
          <div>
            <div className="d-flex align-items-center justify-content-start">
              <div
                className="update p-2"
                onClick={() => updateCart(product, quantity - 1)}
              >
                <FontAwesomeIcon icon="minus-circle" />
              </div>
              <div className="font-weight-bold">
                <input
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    updateCart(product, parseInt(e.target.value))
                  }
                  inputMode="numeric"
                  pattern="[0-9]*"
                  type="text"
                  name="quantity"
                  value={quantity}
                />
              </div>
              <div
                className="update p-2"
                onClick={() => updateCart(product, quantity + 1)}
              >
                <FontAwesomeIcon icon="plus-circle" />
              </div>
            </div>
          </div>
          <div className="w-25 text-right">
            {getCurrencyFormat(product.price * quantity)}
          </div>
          <div
            className="update text-right p-2"
            onClick={() => updateCart(product, 0)}
          >
            <FontAwesomeIcon icon={["far", "trash-alt"]} />
          </div>
        </div>
      </div>
    </li>
  );
};

interface CartItemsProps {
  cart: Cart;
  updateCart: UpdateCart;
  openClass: string;
}

const CartItems: React.FC<CartItemsProps> = ({
  cart,
  updateCart,
  openClass
}) => {
  const result = [];
  for (let [product, quantity] of cart.items.entries()) {
    result.push(
      <CartItem
        key={product.id}
        product={product}
        quantity={quantity}
        updateCart={updateCart}
        openClass={openClass}
      />
    );
  }
  return <>{result}</>;
};

export default CartItems;
