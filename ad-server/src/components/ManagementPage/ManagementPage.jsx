import React, { useState } from 'react';
// import Navbar from './Navbar/Navbar';
import './ManagementPage.css'
import AddModal from './AddModal/AddModal';
import AdTable from './AdTable/AdTable';
// import LoginPage from './LoginPage/LoginPage';
import PublishModal from './PublishModal/PublishModal';
import CampaignModal from './CampaignModal/CampaignModal';

export default () => {
    const [showAdTable, setShowAdTable] = useState(true);
    const closeAdTable = () => setShowAdTable(false);

    const [showPub, setShowPub] = useState(false);
    const closePubModal = () => {
        setShowPub(false);
        setShowAdTable(true);
    }

    const [showCampaign, setShowCampaign] = useState(false);
    const closeCampaignModal = () => {
        setShowCampaign(false);
        setShowAdTable(true);
    }

    const [showAddModal, setShowAddModal] = useState(false);
    const closeAddModal = () => { 
        setShowAddModal(false);
        setShowAdTable(true);
    }

    const openAdTable = () => {
        setShowAdTable(true);
        closeCampaignModal();
        closeAddModal();
        closePubModal();
    }

    const openCampaignModal = () => {
        setShowCampaign(true);
        closeAdTable();
        closeAddModal();
        closePubModal();
    }

    const openAddModal = () => {
        setShowAddModal(true);
        closeCampaignModal();
        closeAdTable();
        closePubModal();
    }

    const logout = () => {
        //to do
    }

    return (
        <div className="management-page">
            <h1>iFixit Ad Server</h1>
            <span className="nav-bar">
                <a className="open-ad-table" onClick={() => openAdTable()}>
                    Ad Board
                </a>
                <a className="open-add-modal" onClick={() => openAddModal()}>
                    New Ad
                </a>
                <a className="open-campaign-modal" onClick={() => openCampaignModal()}>
                    New Campaign
                </a>
                <a className="logout-btn" onClick={() => logout()}>
                    Logout
                </a>

                <CampaignModal show={showCampaign} closeModal={closeCampaignModal}/>

                <AddModal show={showAddModal} closeModal={closeAddModal}/>

                <AdTable show={showAdTable} closeModal={closeAdTable}/>
            </span>

            <a className="open-publish-modal" onClick={() => setShowPub(true)}>
                Publish
            </a>
            <PublishModal show={showPub} closeModal={closePubModal}/>
        </div>
    );
};