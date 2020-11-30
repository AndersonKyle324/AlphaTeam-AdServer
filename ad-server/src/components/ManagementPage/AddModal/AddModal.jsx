import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import "./AddModal.css";

export default (props) => {
  const [ad, setAd] = useState({
    name: "",
    campaign: "",
    size: "",
    imageFile: null,
    altText: "",
    title: "",
    subtitle: "",
    buttonAlign: null,
    buttonText: "",
    buttonUrl: "",
    placeholder: "",
  });

  const handleInputChange = (e) => {};

  const handleFileChange = () => {};

  // Create an object of formData and post it to the server
  const handFileUpload = () => {};

  const handleSubmit = () => {
    console.log(ad.name);
    if (ad.name == "") {
      alert("Provide an Ad Name");
    } else {
      let data = new Object();
      data.adId = ad.name;
    }
  };

  return (
    // JSX goes here
    <Modal {...props} size="lg" centered backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">New Ad</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col sm={4}>
              <Form.Group controlId="ad.name">
                <Form.Label>Ad Name</Form.Label>
                <Form.Control placeholder="Enter ad name" />
              </Form.Group>
              <Form.Group controlId="ad.size">
                <Form.Label>Ad Size</Form.Label>
                <Form.Control as="select">
                  <option>Select Ad Size</option>
                  <option>Large: 961px x 200px</option>
                  <option>Small: 400px x 200px</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="ad.campaign">
                <Form.Label>Campaign</Form.Label>
                <Form.Control as="select">
                  <option>Select Campaign</option>
                  <option>Repair Kit Sale</option>
                  <option>Nintendo Switch</option>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.File
                  id="ad.imageFile"
                  label="Upload background image..."
                />
              </Form.Group>
              <Form.Group controlId="ad.altText">
                <Form.Label>Alt text for image</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="Describe your image for screen readers..."
                />
              </Form.Group>
            </Col>
            <Col sm={8}>
              <Form.Group controlId="ad.placeholder">
                <Form.Label>Placeholder for preview</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={8}
                  placeholder="This is a placeholder"
                />
              </Form.Group>
              <Row>
                <Col sm={6}>
                  <Form.Group controlId="ad.title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control placeholder="Enter Title" />
                  </Form.Group>
                  <Form.Group controlId="ad.subtitle">
                    <Form.Label>Subtitle</Form.Label>
                    <Form.Control placeholder="Enter Subtitle" />
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group controlId="ad.buttonAlign">
                    <Form.Label>Button Alignment</Form.Label>
                    <Form.Control as="select">
                      <option>Select Button Alignment</option>
                      <option>Left</option>
                      <option>Center</option>
                      <option>Right</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="ad.buttonText">
                    <Form.Label>Button Text</Form.Label>
                    <Form.Control placeholder="Enter Button Text" />
                  </Form.Group>
                  <Form.Group controlId="ad.buttonUrl">
                    <Form.Label>Button Click Destination</Form.Label>
                    <Form.Control placeholder="http://" />
                  </Form.Group>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={() => handleSubmit()}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
