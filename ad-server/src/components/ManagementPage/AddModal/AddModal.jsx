import Axios from "axios";
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
    alignment: "",
    buttonText: "",
    buttonUrl: "",
    imageFile: false,
    src: false, // for preview
  });

  const handleInputChange = (e) => {};

  // Create an object of formData and post it to the server
  const handleImageUpload = async (e) => {
    var imageFile = e.target.files[0];
    console.log(imageFile)
    let fileData = new FormData();
    fileData.set('image', imageFile, `${Date.now()}-${imageFile.name}`)
    console.log("imageFile name during imageUpload: ");
    console.log(imageFile.name);
    await Axios({
      method: 'post',
      url: 'http://localhost:3001/ad/upload',
      data: fileData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((response) => console.log(response)).catch((error) => console.log(error));
    var src = URL.createObjectURL(imageFile);

    setAd({ ...ad, imageFile: imageFile, src: src });
  };

  const renderPreview = () => {
    let align = { backgroundImage: `url(${ad.src})`};
    if (ad.src && ad.alignment !== "" && ad.alignment !== "Select Alignment") {
      if (ad.alignment === "Left") {
        align = { textAlign: "left", backgroundImage: `url(${ad.src})` };
      } else if (ad.alignment === "Center") {
        align = { textAlign: "center", backgroundImage: `url(${ad.src})` };
      } else {
        align = { backgroundImage: `url(${ad.src})`};
      }
      return (
        <div
          className="preview"
          style={align}
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
    } else if (ad.alignment === "" || ad.alignment === "Select Alignment") {
      return <p>Select Alignment</p>;
    } else {
      return <p>Upload Background Image</p>;
    }
  };

  const handleSubmit = async () => {
    if (ad.name === "") {
      alert("Ad Name Required");
    } else {
      const data = {
        adName: ad.name,
        campaign: ad.campaign,
        size: ad.size,
        title: ad.title,
        subtitle: ad.subtitle,
        alignment: ad.alignment,
        buttonText: ad.buttonText,
        url: ad.buttonUrl,
        altText: ad.altText,
        imageFile: ad.imageFile,
        statistics: {
          clicks: 0,
          seen: 0,
          ctr: 0,
        },
      };
      console.log(data);
      //post ad data to server
      await Axios.post('http://localhost:3001/ad', data)
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
      props.onHide();
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
                value={ad.name}
              />
              <Form.Label>Ad Size</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => setAd({ ...ad, size: e.target.value })}
                value={ad.size}
              >
                <option>Select Ad Size</option>
                <option>Small: 400px x 200px</option>
                <option>Large: 961px x 200px</option>
              </Form.Control>
              <Form.Label>Campaign</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => setAd({ ...ad, campaign: e.target.value })}
                value={ad.campaign}
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
                value={ad.altText}
              />
            </Col>
            <Col sm={8}>
              <div class="preview">{renderPreview()}</div>
              <Row>
                <Col sm={6}>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    onChange={(e) => setAd({ ...ad, title: e.target.value })}
                    value={ad.title}
                  />
                  <Form.Label>Subtitle</Form.Label>
                  <Form.Control
                    onChange={(e) => setAd({ ...ad, subtitle: e.target.value })}
                    value={ad.subtitle}
                  />
                </Col>
                <Col sm={6}>
                  <Form.Label>Content Alignment</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={(e) =>
                      setAd({ ...ad, alignment: e.target.value })
                    }
                    value={ad.alignment}
                  >
                    <option>Select Alignment</option>
                    <option>Left</option>
                    <option>Center</option>
                  </Form.Control>
                  <Form.Label>Button Text</Form.Label>
                  <Form.Control
                    onChange={(e) =>
                      setAd({ ...ad, buttonText: e.target.value })
                    }
                    value={ad.buttonText}
                  />
                  <Form.Label>Button Click Destination</Form.Label>
                  <Form.Control
                    placeholder="http://"
                    onChange={(e) =>
                      setAd({ ...ad, buttonUrl: e.target.value })
                    }
                    value={ad.buttonUrl}
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
