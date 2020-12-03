import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import "./AddModal.css";

export default (props) => {
  const [ad, setAd] = useState({
    name: "",
    campaign: "",
    size: "",
    altText: "",
    title: "",
    subtitle: "",
    buttonAlign: "",
    buttonText: "",
    buttonUrl: "",
    imageFile: false,
    src: false, // for preview
  });

  const handleInputChange = (e) => {};

  // Create an object of formData and post it to the server
  const handleImageUpload = (e) => {
    var imageFile = e.target.files[0];
    var src = URL.createObjectURL(imageFile);

    setAd({ ...ad, imageFile: imageFile, src: src });
  };

  const renderPreview = () => {
    if (ad.src) {
      if (ad.buttonAlign === "Left") {
        return (
          <div
            className="preview"
            style={{ textAlign: "left", backgroundImage: `url(${ad.src})` }}
          >
            <div className="previewText">
              <h3>{ad.title}</h3>
              <h5>{ad.subtitle}</h5>
            </div>
            <div className="fakeButtonLeft">
              <p>{ad.buttonText}</p>
            </div>
          </div>
        );
      } else if (ad.buttonAlign === "Center") {
        return (
          <div
            className="preview"
            style={{ backgroundImage: `url(${ad.src})` }}
          >
            <div className="previewText">
              <h3>{ad.title}</h3>
              <h5>{ad.subtitle}</h5>
            </div>
            <div className="fakeButton">
              <p>{ad.buttonText}</p>
            </div>
          </div>
        );
      } else {
        return <p>Select Alignment</p>;
      }
    } else {
      return <p>Upload Background Image</p>;
    }
  };

  const handleSubmit = () => {
    console.log(ad.name);
    if (ad.name == "") {
      alert("Provide an Ad Name");
    } else {
      const data = {
        adId: ad.name,
        adName: ad.name,
        campaign: ad.campaign,
        size: ad.size,
        title: ad.title,
        subtitle: ad.subtitle,
        buttonAlign: ad.buttonAlign,
        buttonText: ad.buttonText,
        url: ad.buttonUrl,
        altText: ad.altText,
        imageFile: null,
        statistics: {
          clicks: 0,
          seen: 0,
          ctr: 0,
        },
      };
      console.log(data);
      //post ad data to server
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
              <Form.Label>Ad Name</Form.Label>
              <Form.Control
                placeholder="Enter ad name"
                onChange={(e) => setAd({ ...ad, name: e.target.value })}
              />
              <Form.Label>Ad Size</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => setAd({ ...ad, size: e.target.value })}
              >
                <option>Select Ad Size</option>
                <option>Small: 400px x 200px</option>
                <option>Large: 961px x 200px</option>
              </Form.Control>
              <Form.Label>Campaign</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => setAd({ ...ad, campaign: e.target.value })}
              >
                <option>Select Campaign</option>
                <option>Repair Kit Sale</option>
                <option>Nintendo Switch</option>
              </Form.Control>
              <Form.File
                id="ad.imageFile"
                label="Upload background image..."
                onChange={(e) => handleImageUpload(e)}
              />
              <Form.Label>Alt text for image</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Describe your image for screen readers..."
                onChange={(e) => setAd({ ...ad, altText: e.target.value })}
              />
            </Col>
            <Col sm={8}>
              <div class="preview">{renderPreview()}</div>
              <Row>
                <Col sm={6}>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    onChange={(e) => setAd({ ...ad, title: e.target.value })}
                  />
                  <Form.Label>Subtitle</Form.Label>
                  <Form.Control
                    onChange={(e) => setAd({ ...ad, subtitle: e.target.value })}
                  />
                </Col>
                <Col sm={6}>
                  <Form.Label>Button Alignment</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={(e) =>
                      setAd({ ...ad, buttonAlign: e.target.value })
                    }
                  >
                    <option>Select Button Alignment</option>
                    <option>Left</option>
                    <option>Center</option>
                  </Form.Control>
                  <Form.Label>Button Text</Form.Label>
                  <Form.Control
                    onChange={(e) =>
                      setAd({ ...ad, buttonText: e.target.value })
                    }
                  />
                  <Form.Label>Button Click Destination</Form.Label>
                  <Form.Control
                    placeholder="http://"
                    onChange={(e) =>
                      setAd({ ...ad, buttonUrl: e.target.value })
                    }
                  />
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
