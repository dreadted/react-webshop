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
        className={`d-flex flex-wrap border-0 ${
          errors.paymentMethod ? "is-invalid" : ""
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
            variant={order.paymentMethod === method.name ? "info" : "secondary"}
            size="lg"
            className="py-2 m-0 border-0"
          >
            <FontAwesomeIcon
              icon={["fab", method.icon]}
              size="2x"
              key={method.icon}
              className="p-0 m-0"
            />
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
