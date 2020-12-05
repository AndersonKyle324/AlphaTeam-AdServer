import Axios from "axios";
import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import "./AddModal.css";

export default (props) => {
  const [ad, setAd] = useState({
    id: "",
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
    imageToken: "",
    impressions: 0,
    clicks: 0,
    ctr: 0,
  });

  React.useEffect(() => {
    setAd({ ...ad, 
            id: props.ad.id,
            name: props.ad.adName,
            campaign: props.ad.campaign,
            size: props.ad.size,
            altText: props.ad.altText,
            title: props.ad.title,
            subtitle: props.ad.subtitle,
            alignment: props.ad.alignment,
            buttonText: props.ad.buttonText,
            buttonUrl: props.ad.url,
            imageToken: props.ad.imageToken,
            impressions: props.ad.impressions,
            clicks: props.ad.clicks,
            ctr: props.ad.conversions
          });
  }, [props.ad])

  // Create an object of formData and post it to the server
  const handleImageUpload = async (e) => {
    // Set states for image preview
    var imageFile = e.target.files[0];
    var src = URL.createObjectURL(imageFile);
    setAd({ ...ad, imageFile: imageFile, src: src, imageToken: `${Date.now()}-${imageFile.name}`});
    // Image token created
  };

  // Preview based on alignment
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

  const clearState = () =>{
    setAd({
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
      imageToken: ""
    });
  }

  // POST or PUT an ad
  const handleSubmit = async () => {
    if (ad.name === "") {
      alert("Ad Name Required");
    } else if (ad.id) {
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
        imageToken: ad.imageToken,
        statistics: {
          clicks: ad.clicks,
          seen: ad.impressions,
          ctr: ad.ctr,
        }
      }

      await Axios.put(`/ad/${ad.id}`, data)
        .then((response) => console.log(response))
        .catch((error) => console.log(error));

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
        imageToken: ad.imageToken,
        statistics: {
          clicks: 0,
          seen: 0,
          ctr: 0,
        }
      }

      await Axios.post('/ad', data)
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
      
      // Post image
      console.log("ImageToken: " + ad.imageToken)
      let fileData = new FormData();
      fileData.set('image', ad.imageFile, ad.imageToken);
      await Axios({
        method: 'post',
        url: 'http://localhost:3001/ad/upload',
        data: fileData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((response) => console.log(response)).catch((error) => console.log(error));  
    }
    
    props.onHide();
    clearState();
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
                <option>Nintendo Switch</option>
                <option>iFixit</option>
                <option>Repair Kit</option>
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
