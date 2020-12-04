import React, { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import firebase from "../../../firebase";
import "./LoginPage.css";

export default () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    error: false,
  });

  const history = useHistory();
  const handleSubmit = async () => {
    if (inputs.username.trim() && inputs.password.trim()) {
      firebase
        .auth()
        .signInWithEmailAndPassword(inputs.username, inputs.password)
        .then(() => {
          //signed in
          history.push("/management");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(`${errorCode}: ${errorMessage}`);
        });
    } else {
      setInputs({ ...inputs, error: true });
    }
  };

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
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
              value={inputs.username}
            />
            <Form.Label className="font-weight-bold">Password</Form.Label>
            <Form.Control
              controlId="password"
              placeholder="Password"
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
              value={inputs.password}
            />
          </Form.Group>
          <Button
            className="primary"
            type="button"
            onClick={() => handleSubmit()}
          >
            Submit
          </Button>
          {inputs.error ? (
            <Alert variant="warning" className="p-2">
              Invalid Login Information
            </Alert>
          ) : null}
        </Form>
      </div>
    </div>
  );
};
