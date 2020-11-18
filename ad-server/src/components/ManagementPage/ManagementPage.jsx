import React, { useState } from 'react';
// import Navbar from './Navbar/Navbar';
import './ManagementPage.css'
import AddModal from './AddModal/AddModal';
import AdTable from './AdTable/AdTable';
import LoginPage from './LoginPage/LoginPage';
import PublishModal from './PublishModal/PublishModal';

export default () => {
    const [showAdTable, setShowAdTable] = useState(true);
    const closeAdTable = () => setShowAdTable(false);

    const [showPub, setShowPub] = useState(false);
    const closePubModal = () => setShowPub(false);

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
        setShowCampaignModal(true);
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

    return (
        <div className="management-page">
            <h1>iFixit Ad Server</h1>
            <div className="nav-bar">
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
                <AddModal show={showAddModal} closeModal={closeAddModal}/>

                <AdTable show={showAdTable} closeModal={closeAdTable}/>
            </div>

            <a className="open-publish-modal" onClick={() => setShowPub(true)}>
                Publish
            </a>
            <PublishModal show={showPub} closeModal={closePubModal}/>
        </div>
    );
};