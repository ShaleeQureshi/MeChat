import React, { useState } from "react";

import { Button, Modal } from "react-bootstrap";

const MyModal = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button
        variant="outline-dark"
        className={props.btnClass}
        onClick={handleShow}
      >
        {props.btnText}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>{props.modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.modalBody}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default MyModal;

/*


          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>

          */
