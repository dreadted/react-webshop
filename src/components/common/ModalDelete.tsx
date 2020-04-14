import React from "react";

// css
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

// components
import CartItem from "./CartItem";

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
  return (
    <Modal show={props.show} backdrop="static" centered>
      <Modal.Body>
        <h5 className="font-weight-bold">{props.caption}</h5>
        <div className="cart my-3">
          <ul className="list-group">
            {props.item && (
              <CartItem
                item={props.item}
                editable={false}
                onChange={() => {}}
                updateParams={{}}
                openClass="open"
              />
            )}
          </ul>
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
