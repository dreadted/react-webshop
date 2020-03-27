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
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="companyId">company</label>
        <div className="field">
          <select id="companyId" name="companyId" className="form-control">
            {companies.map((company, index) => (
              <option value={index ? index : ""} key={company}>
                {company}
              </option>
            ))}
          </select>
        </div>
        {errors.companyId && (
          <div className="alert alert-danger">{errors.companyId}</div>
        )}
      </div>

      <label htmlFor="createdBy">e-mail</label>
      <div className="field">
        <input
          id="createdBy"
          name="createdBy"
          type="text"
          className="form-control"
        />
      </div>
      {errors.createdBy && (
        <div className="alert alert-danger">{errors.createdBy}</div>
      )}

      <div className="my-2">payment method</div>
      {payMethods.map(method => (
        <div className="form-check-inline" key={method.icon}>
          <label className="form-check-label">
            <input
              type="radio"
              className="form-check-input"
              name="paymentMethod"
              id={method.icon}
              value={method.name}
            />
            <FontAwesomeIcon
              icon={["fab", method.icon]}
              size="lg"
              key={method.icon}
            />
          </label>
        </div>
      ))}

      {errors.paymentMethod && (
        <div className="alert alert-danger">{errors.paymentMethod}</div>
      )}
      <div className="mt-4 text-right">
        <input type="submit" value="Place Order" className="btn btn-primary" />
      </div>
    </form>
  );
};

export default CheckoutForm;
