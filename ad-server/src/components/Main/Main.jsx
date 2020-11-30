import React from "react";
import { Route, Switch } from "react-router-dom";
import ManagementPage from "../ManagementPage/ManagementPage";
import LoginPage from "../ManagementPage/LoginPage/LoginPage";

export default () => (
  <div className="App">
    <Switch>
      <Route exact path="/" render={() => <LoginPage />} />
      <Route path="/management" render={() => <ManagementPage />} />
    </Switch>
  </div>
);
