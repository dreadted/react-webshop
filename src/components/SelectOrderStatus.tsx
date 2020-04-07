import React, { ChangeEvent } from "react";

interface SelectOrderStatusProps {
  order: Order;
  orderStatus: string[];
  selected?: number;
  onChange: HandleChange;
}

const SelectOrderStatus: React.FC<SelectOrderStatusProps> = ({
  order,
  orderStatus,
  selected = 0,
  onChange
}) => {
  return (
    <select
      name="orderStatus"
      className="badge-select w-100"
      defaultValue={selected}
      onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e, order)}
    >
      {orderStatus.map((status, index) => (
        <option value={index} key={status}>
          {status}
        </option>
      ))}
    </select>
  );
};

export default SelectOrderStatus;
