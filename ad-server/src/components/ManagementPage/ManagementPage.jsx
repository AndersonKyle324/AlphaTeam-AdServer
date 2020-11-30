import React, { useState } from "react";
import { Container, Row, Col } from "react-grid-system";
// import Navbar from './Navbar/Navbar';
import "./ManagementPage.css";
import AddModal from "./AddModal/AddModal";
import AdTable from "./AdTable/AdTable";
// import LoginPage from './LoginPage/LoginPage';
import PublishModal from "./PublishModal/PublishModal";
import CampaignModal from "./CampaignModal/CampaignModal";

export default () => {
  const [showAdTable, setShowAdTable] = useState(true);
  const closeAdTable = () => setShowAdTable(false);

  const [showPub, setShowPub] = useState(false);
  const [showCampaign, setShowCampaign] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const closeAddModal = () => {
    setShowAddModal(false);
    setShowAdTable(true);
  };

  const openAdTable = () => {
    setShowAdTable(true);
    closeAddModal();
  };

  const openAddModal = () => {
    setShowAddModal(true);
    closeAdTable();
  };

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
              <h3 className="open-ad-table" onClick={() => openAdTable()}>
                Ad Board
              </h3>
              <AddModal show={showAddModal} closeModal={closeAddModal} />
              <AdTable show={showAdTable} closeModal={closeAdTable} />
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
            <p className="open-add-modal" onClick={() => openAddModal()}>
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
