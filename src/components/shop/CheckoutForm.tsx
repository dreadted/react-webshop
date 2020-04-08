import React from "react";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// components
import SelectCompany from "../common/SelectCompany";
import TogglePayMethod from "./TogglePayMethod";

interface CheckoutFormProps {
  order: Order;
  setOrder: React.Dispatch<React.SetStateAction<Order>>;
  onSubmit: HandleSubmit;
  errors: OrderErrors;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  order,
  setOrder,
  onSubmit,
  errors
}) => {
  const handleChangeCompany: HandleChange = e => {
    order.companyId = parseInt(e.target.value);
    setOrder(order);
  };

  return (
    <form className="h5 mt-4" onSubmit={onSubmit}>
      <div className="form-group">
        <SelectCompany
          selected={order.companyId}
          onChange={handleChangeCompany}
        />
        {errors.companyId && (
          <div className="alert alert-danger mt-3">{errors.companyId}</div>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="createdBy">e-mail</label>
        <div className="field">
          <input
            id="createdBy"
            name="createdBy"
            type="text"
            className="form-control form-control-lg"
          />
          {errors.createdBy && (
            <div className="alert alert-danger mt-3">{errors.createdBy}</div>
          )}
        </div>
      </div>
      <TogglePayMethod order={order} setOrder={setOrder} />
      {errors.paymentMethod && (
        <div className="alert alert-danger mt-3">{errors.paymentMethod}</div>
      )}
      <div className="mt-4 text-right">
        <button type="submit" className="btn btn-primary">
          Place Order
          <FontAwesomeIcon icon="angle-right" size="lg" className="ml-2" />
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
