import React from "react";

interface SelectCompanyProps {
  companies: Company[];
}

const SelectCompany: React.FC<SelectCompanyProps> = ({ companies }) => {
  return (
    <div className="field">
      <select
        id="companyId"
        name="companyId"
        className="form-control form-control-lg"
      >
        {companies.map(company => (
          <option value={company.id ? company.id : ""} key={company.id}>
            {company.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectCompany;
