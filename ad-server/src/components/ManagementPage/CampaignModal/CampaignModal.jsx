import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default (props) => {
    const [campaign, setCampaign] = useState({
        campaignName: ''
    });

    const handleSubmit = () => {
        //to do for handling form submit
        console.log(campaign.campaignName);
        if (campaign.campaignName == ""){
            alert("A name must be provided");
        }
        else{
            let data = new Object();
            data.campaignId = campaign.campaignName;
            //axios.post('/campaign/create', data );
        }
    }

    return (
        <Modal
            {...props}
            size="lg"
            centered
            backdrop="static"
            keyboard={false}
        >
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
                            value={campaign.campaignName}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>Close</Button>
                <Button onClick={() => handleSubmit()}>Submit</Button>
            </Modal.Footer>
        </Modal>
    )
};

