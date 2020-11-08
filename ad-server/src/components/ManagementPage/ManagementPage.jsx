import React from 'react';
import Navbar from './Navbar/Navbar';
import AddModal from './AddModal/AddModal';

export default () => (
    <div className="management-page">
        <h1>Hello World!</h1>
        <AddModal />
        <Navbar />
    </div>
);