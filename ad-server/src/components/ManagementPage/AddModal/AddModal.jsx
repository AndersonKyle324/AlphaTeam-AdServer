import React from 'react';
import './AddModal.css';
 
class AddModal extends React.Component {
    // JavaScript goes here
    // i.e. declaring variables, functions, etc.
    constructor(props) {
        super(props);
        this.state = {
            adName: '',
            campaignKind: '',
            adSize: '',
            imageFile: null,
            altText: '',
            adTitle: '',
            adSubtitle: '',
            buttonKind: null,
            buttonText: '',
            buttonUrl: '',
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleFileChange(event) {
        this.setState({ imageFile: event.target.files[0] });
    }

    // Create an object of formData and post it to the server
    handFileUpload() {

    }

    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        return (
            // JSX goes here

            <form onSumbit={ this.handleSubmit }
                style={{
                    display: this.props.show ? 'block' : 'none'
                }}
            >
                <div className="container">
                    <div className="title">
                        <h2>New Ad</h2>    
                    </div>

                    <div className="actionButtons">
                        <input type="submit" value="Save" />
                        <button onClick={this.props.closeModal} className="grayButton">
                            Cancel
                        </button>
                    </div>                    
            

                    <div className="info">
                        <label for="adName">Ad Name</label>
                        <input 
                            name="adName" 
                            type="text" 
                            value={ this.state.adName} 
                            onChange={ this.handleInputChange } 
                        />
                        <label for="adSize">Ad Size</label>
                        <select 
                            name="adSize" 
                            value={ this.state.adSize } 
                            onChange={ this.handleInputChange}
                            >
                            <option value="" disabled selected hidden>Select size</option>
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                        </select>                        <label for="campaignKind">Campaign</label>
                        <select 
                            name="campaignKind" 
                            value={ this.state.campaignKind } 
                            onChange={ this.handleInputChange}
                            >
                            <option value="" disabled selected hidden>Select campaign</option>
                            <option value="General">General</option>
                            <option value="Nintendo Switch Kit">Nintendo Switch Kit</option>
                            <option value="Repair Kit Sale">Repair Kit Sale</option>
                        </select>
                    </div>

                    <div className="preview">
                        <div className="blacksquare">
                            This is a placeholder for the Ad Preview!
                        </div>
                    </div>

                    <div className="imageUp">
                        <label for="imageFile">Upload Image</label>
                        <input
                            name="imageFile" 
                            type="file"
                            onChange={this.handleFileChange}
                        />
                        <p>File Type: .png, .jpg, .jpeg</p>
                        <p>File Size: Less than 1 GB</p>
                        <textarea
                            name="altText"
                            value={ this.state.altText} 
                            cols="40"
                            placeholder="Describe your image for screen readers..." 
                            onChange={ this.handleInputChange }
                        />
                        <button onClick={this.handleFileUpload}>
                            Post Image on Server
                        </button>

                    </div>


                    <div className="design1">
                        <label for="adTitle">Ad Title</label>
                        <input 
                            name="adTitle" 
                            type="text" 
                            value={ this.state.adTitle} 
                            onChange={ this.handleInputChange } 
                        />     
                        <label for="adSubtitle">Ad Subtitle</label>
                        <input 
                            name="adSubtitle" 
                            type="text" 
                            value={ this.state.adSubtitle} 
                            onChange={ this.handleInputChange } 
                        />                       
                    </div>

                    <div className="design2">
                        <label for="buttonKind">Button Style</label>
                        <select 
                            name="buttonKind" 
                            value={ this.state.buttonKind } 
                            onChange={ this.handleInputChange}
                            >
                            <option value="" disabled selected hidden>Select style</option>
                            <option value="center">Center</option>
                            <option value="left">Left</option>
                            <option value="right">Right</option>
                        </select>
                        <label for="buttonText">Button Text</label>
                        <input 
                            name="buttonText" 
                            type="text" 
                            value={ this.state.buttonText} 
                            onChange={ this.handleInputChange } 
                        />
                        <label for="buttonUrl">Button Click Destination</label>
                        <input 
                            name="buttonUrl" 
                            type="text" 
                            placeholder="http://" 
                            value={ this.state.buttonUrl} 
                            onChange={ this.handleInputChange } 
                        />
                    </div>
                </div>
            </form>
        );
    }
};

export default AddModal;