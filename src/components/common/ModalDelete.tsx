import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { getCurrencyFormat } from "../../lib/utils";

interface ModalDeleteProps {
  props: ModalProps;
  onDelete: HandleClick;
  onCancel: HandleClick;
}
const ModalDelete: React.FC<ModalDeleteProps> = ({
  props,
  onDelete,
  onCancel
}) => {
  const product = props.item?.product;
  const quantity = props.item?.quantity ? props.item?.quantity : 0;

  return (
    <Modal show={props.show} backdrop="static" centered>
      <Modal.Body>
        <h5 className="font-weight-bold">{props.caption}</h5>
        <div className="cart my-3">
          <div className="cart-item d-flex align-items-center justify-content-between open">
            <div className="mr-3">
              <img
                className="thumbnail"
                src={product?.imageUrl}
                alt={product?.name}
              />
            </div>
            <div className="flex-grow-1 d-flex flex-column h5">
              <div>{product?.name}</div>
              <div className="d-flex align-items-center justify-content-between">
                <div className="w-50 text-right">{quantity}</div>
                <div className="w-50 text-right">
                  {getCurrencyFormat(product ? product.price * quantity : 0)}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-end">
          <Button variant="outline-info" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onDelete} className="ml-3">
            Delete
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalDelete;
