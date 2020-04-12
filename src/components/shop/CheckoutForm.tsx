import React from "react";
import Form from "react-bootstrap/Form";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// components
import SelectCompany from "../common/SelectCompany";
import TogglePayMethod from "./TogglePayMethod";

interface CheckoutFormProps {
  order: Order;
  setOrder: React.Dispatch<React.SetStateAction<Order>>;
  errors: OrderErrors;
  setErrors: React.Dispatch<React.SetStateAction<OrderErrors>>;
  isValidEmail: () => boolean;
  isSaving: boolean;
  onSubmit: HandleSubmit;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  order,
  setOrder,
  errors,
  setErrors,
  isValidEmail,
  isSaving,
  onSubmit
}) => {
  const handleChange: HandleChange = e => {
    if (e.target.name) {
      setErrors({ ...errors, [e.target.name]: "" });
      const value = { [e.target.name]: e.target.value };
      setOrder({ ...order, ...value });
    }
  };

  return (
    <Form onSubmit={onSubmit} noValidate className="mt-4">
      <SelectCompany
        selected={order.companyId}
        onChange={handleChange}
        errors={errors}
      />
      <Form.Group controlId="formGroupEmail">
        <Form.Label>e-mail address</Form.Label>
        <Form.Control
          type="text"
          name="createdBy"
          placeholder="e-mail"
          size="lg"
          value={order.createdBy}
          onChange={handleChange}
          isValid={isValidEmail()}
          isInvalid={!!errors.createdBy}
        />
        <Form.Control.Feedback type="invalid">
          {errors.createdBy}
        </Form.Control.Feedback>
      </Form.Group>
      <TogglePayMethod
        order={order}
        setOrder={setOrder}
        errors={errors}
        setErrors={setErrors}
      />
      <div className="text-right mt-4">
        <button type="submit" className="w-40 btn btn-primary mt-4 mt-md-0">
          {isSaving ? (
            <FontAwesomeIcon icon="spinner" pulse />
          ) : (
            <>
              Place order
              <FontAwesomeIcon icon="angle-right" size="lg" className="ml-2" />
            </>
          )}
        </button>
      </div>
    </Form>
  );
};

export default CheckoutForm;
