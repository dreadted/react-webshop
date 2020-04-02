import React, { ChangeEvent } from "react";

interface SelectOrderStatusProps {
  order: Order;
  orderStatus: string[];
  selected?: number;
  onChange: HandleChangeStatus;
}

const SelectOrderStatus: React.FC<SelectOrderStatusProps> = ({
  order,
  orderStatus,
  selected = 0,
  onChange
}) => {
  return (
    <div className="form-group">
      <div className="field mt-3 mb-0 p-0">
        <select
          id="orderStatus"
          name="orderStatus"
          className="form-control form-control-sm"
          defaultValue={selected}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e, order)}
        >
          {orderStatus.map((status, index) => (
            <option value={index} key={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectOrderStatus;
