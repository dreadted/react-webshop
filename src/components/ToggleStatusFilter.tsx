import React from "react";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

// init
import { orderStatusArray } from "../lib/init";

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
