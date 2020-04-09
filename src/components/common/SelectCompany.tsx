import React, { useContext } from "react";

// context
import { OrderContext } from "../../contexts/OrderContext";
import Form from "react-bootstrap/Form";

interface SelectCompanyProps {
  selected?: number;
  onChange?: HandleChange;
  errors?: OrderErrors;
}

const SelectCompany: React.FC<SelectCompanyProps> = ({
  selected = 0,
  onChange,
  errors
}) => {
  const { companies } = useContext(OrderContext);
  return (
    <Form.Group controlId="formGroupCompany">
      <Form.Label>company</Form.Label>
      <Form.Control
        as="select"
        custom
        size="lg"
        name="companyId"
        defaultValue={selected}
        onChange={onChange}
        isInvalid={!!errors?.companyId}
      >
        {companies.map(company => (
          <option value={company.id ? company.id : ""} key={company.id}>
            {company.name}
          </option>
        ))}
      </Form.Control>
      <Form.Control.Feedback type="invalid">
        {errors?.companyId}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default SelectCompany;
