import React from "react";
import TextInput from "./TextInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface CheckoutFormProps {
  cart: Cart;
  order: Order;
  onChange: HandleChange;
  onSubmit: HandleSubmit;
  errors: OrderErrors;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  cart,
  order,
  onChange,
  onSubmit,
  errors
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="companyId">company</label>
        <div className="field">
          <select
            id="companyId"
            name="companyId"
            onChange={onChange}
            value={order.companyId || ""}
            className="form-control"
          >
            <option value="" />
            <option value="1">Telia</option>
            <option value="2">Volvo</option>
            <option value="3">Skanska</option>
            <option value="4">ABB</option>
          </select>
        </div>
        {errors.companyId && (
          <div className="alert alert-danger">{errors.companyId}</div>
        )}
      </div>

      <TextInput
        id="createdBy"
        label="e-mail"
        onChange={onChange}
        value={order.createdBy}
        error={errors.createdBy}
      />

      <div className="my-2">payment method</div>
      <div className="form-check-inline">
        <label className="form-check-label">
          <input
            type="radio"
            className="form-check-input"
            name="paymentMethod"
            id="payVisa"
            value="Visa"
            onChange={onChange}
          />
          <FontAwesomeIcon icon={["fab", "cc-visa"]} size="lg" />
        </label>
      </div>

      <div className="form-check-inline">
        <label className="form-check-label">
          <input
            type="radio"
            className="form-check-input"
            name="paymentMethod"
            id="payMC"
            value="MasterCard"
            onChange={onChange}
          />
          <FontAwesomeIcon icon={["fab", "cc-mastercard"]} size="lg" />
        </label>
      </div>

      <div className="form-check-inline">
        <label className="form-check-label">
          <input
            type="radio"
            className="form-check-input"
            name="paymentMethod"
            id="payAMEX"
            value="American Express"
            onChange={onChange}
          />
          <FontAwesomeIcon icon={["fab", "cc-amex"]} size="lg" />
        </label>
      </div>

      {errors.paymentMethod && (
        <div className="alert alert-danger">{errors.paymentMethod}</div>
      )}
      <div className="mt-4">
        <input type="submit" value="Place Order" className="btn btn-primary" />
      </div>
    </form>
  );
};

export default CheckoutForm;
