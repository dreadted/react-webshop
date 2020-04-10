import React from "react";

// icons
import {
  FontAwesomeIcon,
  FontAwesomeIconProps
} from "@fortawesome/react-fontawesome";
import { IconName } from "@fortawesome/fontawesome-svg-core";

const PAY_METHODS = [
  { icon: "cc-visa" as IconName, name: "Visa" },
  { icon: "cc-mastercard" as IconName, name: "MasterCard" },
  { icon: "cc-amex" as IconName, name: "Amex" }
];

interface PaymentIconProps {
  name: string;
  size: FontAwesomeIconProps["size"];
}
const PaymentIcon: React.FC<PaymentIconProps> = ({ name, size }) => {
  const icon = PAY_METHODS.find(
    i => i.name.toLowerCase() === name.toLowerCase()
  );
  if (icon) return <FontAwesomeIcon icon={["fab", icon.icon]} size={size} />;
  return <></>;
};

export default PaymentIcon;
