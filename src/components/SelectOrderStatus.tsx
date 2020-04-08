import React, { ChangeEvent, useContext } from "react";
import { OrderContext } from "../contexts/OrderContext";

interface SelectOrderStatusProps {
  order: Order;
  selected?: number;
  onChange: HandleChange;
}

const SelectOrderStatus: React.FC<SelectOrderStatusProps> = ({
  order,
  selected = 0,
  onChange
}) => {
  const { orderStatusArray } = useContext(OrderContext);
  return (
    <select
      name="orderStatus"
      className="badge-select w-100"
      defaultValue={selected}
      onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e, order)}
    >
      {orderStatusArray.map((status, index) => (
        <option value={index} key={status}>
          {status}
        </option>
      ))}
    </select>
  );
};

export default SelectOrderStatus;
