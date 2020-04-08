import React from "react";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconName } from "@fortawesome/fontawesome-svg-core";

const PAY_METHODS = [
  { icon: "cc-visa" as IconName, name: "Visa" },
  { icon: "cc-mastercard" as IconName, name: "MasterCard" },
  { icon: "cc-amex" as IconName, name: "Amex" }
];

interface TogglePayMethodProps {
  order: Order;
  setOrder: React.Dispatch<React.SetStateAction<Order>>;
}

const TogglePayMethod: React.FC<TogglePayMethodProps> = ({
  order,
  setOrder
}) => {
  const onChange: HandleChange = value => {
    order.paymentMethod = value;
    setOrder(order);
  };

  return (
    <div className="my-3">
      <ToggleButtonGroup
        className="d-flex flex-wrap"
        type="radio"
        name="options"
        value={order.paymentMethod}
        onChange={onChange}
      >
        {PAY_METHODS.map(method => (
          <ToggleButton
            key={method.icon}
            value={method.name}
            variant="outline-secondary"
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
    </div>
  );
};

export default TogglePayMethod;
