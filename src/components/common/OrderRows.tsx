import React, { useContext } from "react";

// context
import { ProductContext } from "../contexts/ProductContext";

// components
import CartItem from "./CartItem";

interface OrderRowsProps {
  items?: CartItem[];
  editable: boolean;
  onChange: HandleChange;
  updateParams: UpdateParams;
  openClass: string;
}

const OrderRows: React.FC<OrderRowsProps> = ({
  items,
  editable,
  onChange,
  updateParams,
  openClass
}) => {
  const { products } = useContext(ProductContext);

  const toCartItems = (orderRows: OrderRow[] | undefined) => {
    if (!orderRows) return [];
    return orderRows.map(orderRow => {
      const product: Product | undefined = products.find(
        product => product.id === orderRow.productId
      );
      return { product, quantity: orderRow.amount } as CartItem;
    });
  };

  if (!items && updateParams?.order)
    items = toCartItems(updateParams.order?.orderRows);
  return (
    <>
      {items?.map(item => {
        return (
          !!item.product && (
            <CartItem
              key={item.product.id}
              item={item}
              editable={editable}
              onChange={onChange}
              updateParams={{ ...updateParams, items }}
              openClass={openClass}
            />
          )
        );
      })}
    </>
  );
};

export default OrderRows;
