import React, { useState } from 'react';
// import Navbar from './Navbar/Navbar';
import './ManagementPage.css'
import AddModal from './AddModal/AddModal';
import AdTable from './AdTable/AdTable';
import PublishModal from './PublishModal/PublishModal';

export default () => {
    const [showAdTable, setShowAdTable] = useState(true);
    const closeAdTable = () => setShowAdTable(false);

    const [showPub, setShowPub] = useState(false);
    const closePubModal = () => setShowPub(false);

    const [showAddModal, setShowAddModal] = useState(false);
    const closeAddModal = () => { 
        setShowAddModal(false);
        setShowAdTable(true);
    }

    const openAdTable = () => {
        setShowAdTable(true);
        closeAddModal();
        closePubModal();
    }

    const openAddModal = () => {
        setShowAddModal(true);
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
                    Create New Ad
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