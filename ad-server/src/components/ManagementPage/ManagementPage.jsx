import React, { useState } from "react";
import { Container, Row, Col } from "react-grid-system";
import "./ManagementPage.css";
import AddModal from "./AddModal/AddModal";
import AdTable from "./AdTable/AdTable";
import PublishModal from "./PublishModal/PublishModal";
import CampaignModal from "./CampaignModal/CampaignModal";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import Advert from "./Advert/Advert";

export default () => {
  const [showPub, setShowPub] = useState(false);
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
    <div className="pageContainer">
      <Container fluid>
        <Row className="header">
          <Col sm={9}>
            <div className="pageTitle">
              <h1>
                <span className="blue">iFixit</span> Ad Server
              </h1>
            </div>
          </Col>
          <Col sm={3}>
            <div className="logout-btn">
              <p className="logout-btn" onClick={() => logout()}>
                Logout`
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm={9}>
            <div className="nav-bar">
              <h3 className="open-ad-table">Ad Board</h3>
              <AddModal
                show={showAddModal}
                onHide={() => setShowAddModal(false)}
              />
              <AdTable />
              <CampaignModal
                show={showCampaign}
                onHide={() => setShowCampaign(false)}
              />
              <PublishModal
                ad={testAd}
                show={showPub}
                onHide={() => setShowPub(false)}
              />
            </div>
          </Col>
          <Col sm={3}>
            <p className="open-add-modal" onClick={() => setShowAddModal(true)}>
              New Ad
            </p>
            <p
              className="open-campaign-modal"
              onClick={() => setShowCampaign(true)}
            >
              New Campaign
            </p>
            <p className="open-publish-modal" onClick={() => setShowPub(true)}>
              Publish
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
