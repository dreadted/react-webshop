import React from "react";

// css
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

// components
import CartItem from "./CartItem";

interface ModalDialogueProps {
  props: ModalProps;
  onConfirm: HandleClick;
  onCancel: () => void;
}
const ModalDialogue: React.FC<ModalDialogueProps> = ({
  props,
  onConfirm,
  onCancel
}) => {
  return (
    <Modal show={props.show} onHide={onCancel} centered>
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title>{props.caption}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-0">
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
            {props.labelCancel}
          </Button>
          <Button variant="danger" onClick={onConfirm} className="ml-3">
            {props.labelConfirm}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalDialogue;
