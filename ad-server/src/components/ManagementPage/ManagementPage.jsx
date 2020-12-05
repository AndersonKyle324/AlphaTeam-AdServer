import React, { useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import "./ManagementPage.css";
import AddModal from "./AddModal/AddModal";
import AdTable from "./AdTable/AdTable";
import CampaignModal from "./CampaignModal/CampaignModal";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import Advert from "./Advert/Advert";
import ifixitLogo from "../../images/ifixit_logo.svg";

export default () => {
  const [showCampaign, setShowCampaign] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const testAd = {
    adName: "testAd",
    altText: "No picture",
    buttonAlign: "Left",
    buttonText: "Go Here",
    campaign: "TestCampaign",
    size: "Large",
    impressions: 100,
    clicks: 20,
    conversions: 30,
    subtitle: "this is the subtitle",
    title: "TestAd Title",
    url: "http://www.Google.com",
  };

  const history = useHistory();
  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`${errorCode}: ${errorMessage}`);
      });
  };

  return (
    <Container fluid>
      <Row className="header">
        <Col sm={8}>
          <div className="pageTitle">
            <img src={ifixitLogo} alt="Ifixit Logo" width="140px" style={{margin: "0", display: "inline-block"}}/> 

            <h6>
              Ad Server
            </h6>
          </div>
        </Col>
        <Col sm={4}>
          <div className="headerRight">
            <Button variant="light" onClick={() => logout()} style={{float: "right"}}>
              Logout
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm={8}>
          <div>
            <AddModal
              ad={{ id: "", adName: "", campaign: "", size: "" }}
              show={showAddModal}
              onHide={() => setShowAddModal(false)}
            />
            <AdTable />
            <CampaignModal
              show={showCampaign}
              onHide={() => setShowCampaign(false)}
            />
          </div>
        </Col>
        <Col sm={4}>
          <div className="sidebar">
            <Button variant="primary" onClick={() => setShowAddModal(true)} style={floatLeft}>
              Create New Ad
            </Button>
            <Button variant="secondary" onClick={() => setShowCampaign(true)} style={floatLeft}>
              Create New Campaign
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  ); 
};

//Button Styles
const floatLeft = {
  float: "left",
  margin: "0.2em 1em",
  display: "block",
  width: "auto"
}
