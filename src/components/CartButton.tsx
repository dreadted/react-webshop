import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface CartButtonProps {
  atCheckout: boolean;
}

const CartButton: React.FC<CartButtonProps> = ({ atCheckout }) => {
  const [url, caption] = atCheckout
    ? ["/order", "Place order"]
    : ["/checkout", "Check out"];
  return (
    <Link to={url} className="btn btn-primary">
      {caption}
      <FontAwesomeIcon icon="angle-right" size="lg" className="ml-2" />
    </Link>
  );
};

export default CartButton;
