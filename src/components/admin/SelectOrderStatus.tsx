import React, { ChangeEvent, useContext } from "react";
import { AdminContext } from "../contexts/AdminContext";

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
  const { orderStatusArray, orderStatusColors } = useContext(AdminContext);

  const statusColor =
    selected !== undefined
      ? orderStatusColors[selected]
      : order?.status !== undefined
      ? orderStatusColors[order.status]
      : "inherit";

  return (
    <select
      name="orderStatus"
      className="w-100 badge-select text-white"
      style={{ color: statusColor, backgroundColor: "transparent" }}
      defaultValue={selected}
      onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e, order)}
    >
      {orderStatusArray.map((status, index) => (
        <option
          value={index}
          key={status}
          style={{ color: orderStatusColors[index] }}
        >
          {status}
        </option>
      ))}
    </select>
  );
};

export default SelectOrderStatus;
