import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconName } from "@fortawesome/fontawesome-common-types";

interface CheckoutFormProps {
  onSubmit: HandleSubmit;
  companies: string[];
  errors: OrderErrors;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  onSubmit,
  companies,
  errors
}) => {
  const payMethods = [
    { icon: "cc-visa" as IconName, name: "Visa" },
    { icon: "cc-mastercard" as IconName, name: "MasterCard" },
    { icon: "cc-amex" as IconName, name: "Amex" }
  ];

  return (
    <form className="h5 mt-4" onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="companyId">company</label>
        <div className="field">
          <select
            id="companyId"
            name="companyId"
            className="form-control form-control-lg"
          >
            {companies.map((company, index) => (
              <option value={index ? index : ""} key={company}>
                {company}
              </option>
            ))}
          </select>
        </div>
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
        </div>
        {errors.createdBy && (
          <div className="alert alert-danger mt-3">{errors.createdBy}</div>
        )}
      </div>
      <fieldset className="form-group pb-4">
        <div className="font-weight-light">payment method</div>
        {payMethods.map(method => (
          <div className="form-check form-check-inline m-0" key={method.icon}>
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
      </fieldset>
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
