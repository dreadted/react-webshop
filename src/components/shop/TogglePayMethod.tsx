import React from "react";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconName } from "@fortawesome/fontawesome-svg-core";
import Form from "react-bootstrap/Form";

const PAY_METHODS = [
  { icon: "cc-visa" as IconName, name: "Visa" },
  { icon: "cc-mastercard" as IconName, name: "MasterCard" },
  { icon: "cc-amex" as IconName, name: "Amex" }
];

interface TogglePayMethodProps {
  order: Order;
  setOrder: React.Dispatch<React.SetStateAction<Order>>;
  errors: OrderErrors;
  setErrors: React.Dispatch<React.SetStateAction<OrderErrors>>;
}

const TogglePayMethod: React.FC<TogglePayMethodProps> = ({
  order,
  setOrder,
  errors,
  setErrors
}) => {
  const onChange: HandleChange = value => {
    setErrors({ ...errors, paymentMethod: "" });
    setOrder({ ...order, paymentMethod: value });
  };

  return (
    <div className="form-group">
      <Form.Label>payment method</Form.Label>
      <ToggleButtonGroup
        className={`d-flex flex-wrap rounded ${
          errors.paymentMethod
            ? "border border-danger is-invalid"
            : "border border-dark"
        }`}
        type="radio"
        name="options"
        value={order.paymentMethod}
        onChange={onChange}
      >
        {PAY_METHODS.map(method => (
          <ToggleButton
            key={method.icon}
            value={method.name}
            variant={order.paymentMethod === method.name ? "secondary" : "info"}
          >
            <div className="d-flex align-items-center justify-content-center">
              <FontAwesomeIcon
                icon={["fab", method.icon]}
                size="2x"
                key={method.icon}
                className="mr-2"
              />
              <span className="d-none d-sm-inline font-weight-lighter">
                {method.name}
              </span>
            </div>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <Form.Control.Feedback type="invalid">
        {errors.paymentMethod}
      </Form.Control.Feedback>
    </div>
  );
};

export default TogglePayMethod;
