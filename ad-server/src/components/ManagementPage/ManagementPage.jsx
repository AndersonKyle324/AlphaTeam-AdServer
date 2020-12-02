import React, { useState } from "react";
import { Container, Row, Col } from "react-grid-system";
import "./ManagementPage.css";
import AddModal from "./AddModal/AddModal";
import AdTable from "./AdTable/AdTable";
import PublishModal from "./PublishModal/PublishModal";
import CampaignModal from "./CampaignModal/CampaignModal";
import Advert from "./Advert/Advert";

// Change to GET from database
const tableData = [
  {
    adName: "SwitchItUp",
    adSize: "Small",
    campaign: "Nintendo Switch",
    lastModified: "10-10-2020",
    impressions: 100,
    clicks: 10,
    conversions: 1,
  },
  {
    adName: "Apples4U",
    adSize: "Medium",
    campaign: "Apples",
    lastModified: "10-10-2020",
    impressions: 2000,
    clicks: 300,
    conversions: 50,
  },
  {
    adName: "OrangesRCool",
    adSize: "Large",
    campaign: "Oranges",
    lastModified: "10-10-2020",
    impressions: 10,
    clicks: 0,
    conversions: 0,
  },
  {
    adName: "BigSwitch",
    adSize: "Large",
    campaign: "Nintendo Switch",
    lastModified: "01-21-2020",
    impressions: 400,
    clicks: 300,
    conversions: 290,
  },
];

export default () => {
  const [showPub, setShowPub] = useState(false);
  const [showCampaign, setShowCampaign] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const logout = () => {
    //to do
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
              <h3 className="open-ad-table">
                Ad Board
              </h3>
              <AddModal
                show={showAddModal}
                onHide={() => setShowAddModal(false)}
              />
              <AdTable adTableData={tableData}/>
              <CampaignModal
                show={showCampaign}
                onHide={() => setShowCampaign(false)}
              />
              <PublishModal
                ad={{ id: "name1", campaignId: "Test2" }}
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
