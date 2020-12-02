import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import axios from 'axios';

export default (props) => {
  const [ad, setAd] = useState({
    url: "",
  });

  const handleSubmit = (event) => {
    //to do for handling form submit
    if (ad.url == "") {
      alert("A url must be provided");
    } else {
      //provide json with ad react component
      axios.post('/ad', data ).then(res => {
        console.log(res);
        // res == error ? alert(res.error) : props.onHide;
      });
    }
  };

  return (
    <Modal {...props} size="lg" centered backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title id="modal-title">Publish Ad</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>URL for "{props.ad.id}" to be displayed on</Form.Label>
            <Form.Control
              controlId="url"
              placeholder="Enter url"
              onChange={(e) => setAd({ url: e.target.value })}
              value={ad.url}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        <Button onClick={() => handleSubmit()}>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
};
