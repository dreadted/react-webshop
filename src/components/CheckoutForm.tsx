import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconName } from "@fortawesome/fontawesome-common-types";
import SelectCompany from "./SelectCompany";

const PAY_METHODS = [
  { icon: "cc-visa" as IconName, name: "Visa" },
  { icon: "cc-mastercard" as IconName, name: "MasterCard" },
  { icon: "cc-amex" as IconName, name: "Amex" }
];

interface CheckoutFormProps {
  onSubmit: HandleSubmit;
  companies: Company[];
  errors: OrderErrors;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  onSubmit,
  companies,
  errors
}) => {
  return (
    <form className="h5 mt-4" onSubmit={onSubmit}>
      <SelectCompany companies={companies} />
      {errors.companyId && (
        <div className="alert alert-danger mt-3">{errors.companyId}</div>
      )}

      <label htmlFor="createdBy">e-mail</label>
      <div className="field">
        <input
          id="createdBy"
          name="createdBy"
          type="text"
          className="form-control form-control-lg"
        />
      </div>
      {errors.createdBy && (
        <div className="alert alert-danger mt-3">{errors.createdBy}</div>
      )}

      <div className="mt-4">payment method</div>
      {PAY_METHODS.map(method => (
        <div className="form-check-inline" key={method.icon}>
          <label className="form-check-label">
            <span>
              <input
                type="radio"
                className="form-check-input"
                name="paymentMethod"
                id={method.icon}
                value={method.name}
              />
              <FontAwesomeIcon
                icon={["fab", method.icon]}
                size="2x"
                key={method.icon}
                className="pt-1"
              />
            </span>
          </label>
        </div>
      ))}

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
