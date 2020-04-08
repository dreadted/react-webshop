import React, { useContext } from "react";

// context
import { OrderContext } from "../contexts/OrderContext";

// components
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

interface ToggleStatusFilter {
  statusFilter: number;
  statusMatches: number[];
  changeStatusFilter: Function;
}

const ToggleStatusFilter: React.FC<ToggleStatusFilter> = ({
  statusFilter,
  statusMatches,
  changeStatusFilter
}) => {
  const { orderStatusArray } = useContext(OrderContext);

  const onChange = (selectedStatus: number) => {
    changeStatusFilter(selectedStatus);
  };

  return (
    <div className="my-3 w-100">
      <ToggleButtonGroup
        className="d-flex flex-wrap w-100"
        type="radio"
        name="options"
        value={statusFilter}
        onChange={onChange}
      >
        <ToggleButton value={-1} variant="info" size="sm">
          All
          <span className="badge badge-pill bg-dark ml-2">
            {statusMatches.reduce((a, b) => a + b, 0)}
          </span>
        </ToggleButton>
        {orderStatusArray.map((status, index) =>
          statusMatches[index] ? (
            <ToggleButton key={status} value={index} variant="info" size="sm">
              {status}
              <span className="badge badge-pill bg-dark ml-2">
                {statusMatches[index]}
              </span>
            </ToggleButton>
          ) : undefined
        )}
      </ToggleButtonGroup>
    </div>
  );
};

export default ToggleStatusFilter;
