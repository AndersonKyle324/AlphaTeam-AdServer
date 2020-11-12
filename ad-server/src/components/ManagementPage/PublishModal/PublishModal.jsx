import React from 'react';
//import './PublishModal.css';

export default ({ show, closeModal }) => {
    return (
        <div className="modal-wrapper"
            style={{
                opacity: show ? '1' : '0'
            }}
        >
            <div className="modal-header">
                <h1> Publish Ad </h1>
                <span className="close-button" onClick={closeModal}>X</span>
            </div>
            <div className="modal-body">
                <form>
                    <label>URL for ad to be displayed on
                        <input type="text" name="url" />
                        <input type="submit" value="Submit" />
                    </label>
                </form>
            </div>
        </div>
    )
};
