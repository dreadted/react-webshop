import React, { useContext } from "react";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

// context
import { AdminContext } from "../contexts/AdminContext";

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
  const { orderStatusArray, orderStatusColors } = useContext(AdminContext);

  const onChange = (selectedStatus: number) => {
    changeStatusFilter(selectedStatus);
  };

  return (
    <div className="my-3 w-100">
      <ToggleButtonGroup
        className="select-order d-flex flex-wrap w-100"
        type="radio"
        name="options"
        value={statusFilter}
        onChange={onChange}
      >
        <ToggleButton
          value={-1}
          variant={statusFilter === -1 ? "secondary" : "info"}
          size="sm"
        >
          All
          <span className="badge badge-pill bg-dark text-light ml-2">
            {statusMatches.reduce((a, b) => a + b, 0)}
          </span>
        </ToggleButton>
        {orderStatusArray.map((status, index) =>
          statusMatches[index] ? (
            <ToggleButton
              key={status}
              value={index}
              variant={statusFilter === index ? "secondary" : "info"}
              size="sm"
            >
              {status}
              <span
                className="badge badge-pill text-light ml-2"
                style={{ backgroundColor: orderStatusColors[index] }}
              >
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
