import React from 'react';
import Navbar from './Navbar/Navbar';
import AddModal from './AddModal/AddModal';
import AdTable from './AdTable/AdTable';

export default () => (
    <div className="management-page">
        <h1>Hello World!</h1>
        <AdTable />
        <AddModal />
        <Navbar />
    </div>
);