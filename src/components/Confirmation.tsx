import React from "react";

interface ConfirmationProps {
  order: Order;
}

const Confirmation: React.FC<ConfirmationProps> = ({ order }) => {
  return (
    <>
      <table>
        <tr>
          <td>id</td>
          <td>{order.id}</td>
        </tr>
        <tr>
          <td>companyId</td>
          <td>{order.companyId}</td>
        </tr>
        <tr>
          <td>created</td>
          <td>{order.created}</td>
        </tr>
        <tr>
          <td>createdBy</td>
          <td>{order.createdBy}</td>
        </tr>
        <tr>
          <td>paymentMethod</td>
          <td>{order.paymentMethod}</td>
        </tr>
        <tr>
          <td>totalPrice</td>
          <td>{order.totalPrice}</td>
        </tr>
        <tr>
          <td>status</td>
          <td>{order.status}</td>
        </tr>
      </table>
    </>
  );
};

export default Confirmation;
