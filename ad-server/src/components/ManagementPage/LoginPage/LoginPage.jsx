import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import './LoginPage.css';

export default () => {
    const [inputs, setInputs] = useState({
        username: '',
        password: '',
        error: false
    });

    const handleSubmit = async () => {
        if (inputs.username.trim() && inputs.password.trim()) {
            const body = {
                username: inputs.username,
                password: inputs.password
            };
    
            // send body to POST request for authentication
            console.log(body);
        } else {
            setInputs({ ...inputs, error: true });
        }
    }

    return (
        <div className="ui-container">
            <div className="login-page">
                <h3>iFixit Ad Server Login</h3>
                <Form>
                    <Form.Group>
                        <Form.Label className="font-weight-bold">Username</Form.Label>
                        <Form.Control
                            controlId="username"
                            placeholder="Username"
                            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                            value={inputs.username}
                        />
                        <Form.Label className="font-weight-bold">Password</Form.Label>
                        <Form.Control
                            controlId="password"
                            placeholder="Password"
                            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                            value={inputs.password}
                        />
                    </Form.Group>
                    <Button className="primary" type="button" onClick={() => handleSubmit()}>Submit</Button>
                    { inputs.error ? <Alert variant="warning" className="p-2">Invalid Login Information</Alert> : null }
                </Form>
            </div>
        </div>
    );
};