import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

interface ModalDeleteProps {
  props: ModalProps;
  show: boolean;
  onClick: HandleClick;
}
const ModalDelete: React.FC<ModalDeleteProps> = ({ props, show, onClick }) => {
  return (
    <Modal show={show} centered>
      <Modal.Body>
        <h4>{props.caption}</h4>
        {props.content}
        <Button onClick={onClick}>OK</Button>
      </Modal.Body>
    </Modal>
  );
};

export default ModalDelete;
