import React, { useState } from 'react';
import Navbar from './Navbar/Navbar';
import AddModal from './AddModal/AddModal';
import PublishModal from './PublishModal/PublishModal';

export default () => {
    const [showPub, setShowPub] = useState(false);
    const closePubModal = () => setShowPub(false);

    return (
    <div className="management-page">
        <h1>Hello World!</h1>
        <AddModal />
        <button className="open-publish-modal" onClick={() => setShowPub(true)}>
            Publish
        </button>
        <PublishModal show={showPub} closeModal={closePubModal}/>
        <Navbar />
    </div>
    );
};