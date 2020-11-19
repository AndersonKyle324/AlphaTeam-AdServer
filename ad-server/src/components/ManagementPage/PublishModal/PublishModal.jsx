import React from 'react';
//import './PublishModal.css';

export default ({ show, closeModal, ad }) => {
    var url = "";

    var handleUrlChange = (event) => {
        //to do for handling url
        //url = event.target.value;
    }

    var handleSubmit = (event) => {
        //to do for handling form submit
        if (url == ""){
            alert("A url must be provided");
        }
        else{
            //axios.get('ad/id', )
            let adComponent = new Object();
            //provide json with ad react component
            //axios.get???('/ad/send??', data );
        }
    }

    return (
        <div className="modal-wrapper"
            style={{
                display: show ? 'block' : 'none'
            }}
        >
            <div className="modal-header">
                <h1> Publish Ad </h1>
                <span className="close-button" onClick={closeModal}>X</span>
            </div>
            <div className="modal-body">
                <form>
                    <label for="url">URL for ad to be displayed on
                        <input 
                            type="text" 
                            name="url"
                            onChange={ handleUrlChange } 
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
