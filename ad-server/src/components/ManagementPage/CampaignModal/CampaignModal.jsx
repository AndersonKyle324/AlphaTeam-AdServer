import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

export default (props) => {
  const [campaign, setCampaign] = useState({
    campaignName: "",
  });

  const handleSubmit = () => {
    //to do for handling form submit
    if (campaign.campaignName == "") {
      alert("A name must be provided");
    } else {
      console.log(campaign);
      axios.post("/campaign", campaign)
        .then((res) => {
          alert(campaign.campaignName + " campaign was create successfully");
          props.onHide();
        })
        .catch(err => {alert(err.message) });
    }
  };

  return (
    <Modal {...props} size="lg" centered backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          New Campaign
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Name of new campaign</Form.Label>
            <Form.Control
              controlId="campaign"
              placeholder="Enter campaign"
              onChange={(e) => setCampaign({ campaignName: e.target.value })}
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
