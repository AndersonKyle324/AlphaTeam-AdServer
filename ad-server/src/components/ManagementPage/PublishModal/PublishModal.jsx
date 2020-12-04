import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import axios from "axios";

export default (props) => {
  const [adLocation, setAdLocation] = useState({
    url: "",
  });

  const handleSubmit = (event) => {
    if (adLocation.url == "") {
      alert("A url must be provided");
    } else {
      //This is what we would do if a site was prepared to accept our ad object
      // axios.post(adLocation.url, props.ad)
      //   .then((res) => {
      //     alert(props.ad.adName + " was successfully uploaded to " + adLocation.url);
      //     props.onHide();
      //   })
      //   .catch(err => {
      //     alert(err.message);
      //   });
      
      console.log("Ad published here: "+adLocation.url+" Ad: "+props.ad);
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
            <Form.Label>URL for "{props.ad.adName}" to be displayed on</Form.Label>
            <Form.Control
              controlId="url"
              placeholder="Enter url"
              onChange={(e) => setAdLocation({ url: e.target.value })}
              value={adLocation.url}
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
