import React from 'react';

export default ({ show, closeModal }) => {
    var campaignName = "";

    var handleCampaignChange = (event) => {
        //to do for handling url
        //campaignName = event.target.value;
    }

    var handleSubmit = () => {
        //to do for handling form submit
        if (campaignName == ""){
            alert("A name must be provided");
        }
        else{
            let data = new Object();
            data.campaignId = campaignName;
            //axios.post('/campaign/create', data );
        }
    }

    return (
        <div className="modal-wrapper"
            style={{
                display: show ? 'block' : 'none'
            }}
        >
            <div className="modal-header">
                <h1> New Campaign </h1>
                <span className="close-button" onClick={closeModal}>X</span>
            </div>
            <div className="modal-body">
                <form>
                    <label for="campaign">Name of new campaign
                        <input 
                            type="text" 
                            name="campaign"
                            onChange={ handleCampaignChange } 
                        />
                    </label>
                    <input 
                        type="submit" 
                        value="Submit"
                        onChange={ handleSubmit } 
                    />
                </form>
            </div>
        </div>
    )
};

