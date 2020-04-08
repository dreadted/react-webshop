import React, { useContext } from "react";

// context
import { OrderContext } from "../../contexts/OrderContext";

interface SelectCompanyProps {
  selected?: number;
  onChange?: HandleChange;
}

const SelectCompany: React.FC<SelectCompanyProps> = ({
  selected = 0,
  onChange
}) => {
  const { companies } = useContext(OrderContext);
  return (
    <div className="form-group">
      <label htmlFor="companyId">company</label>
      <div className="field">
        <select
          id="companyId"
          name="companyId"
          className="form-control form-control-lg"
          defaultValue={selected}
          onChange={onChange}
        >
          {companies.map(company => (
            <option value={company.id ? company.id : ""} key={company.id}>
              {company.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectCompany;
