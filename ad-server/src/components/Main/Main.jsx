import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ManagementPage from '../ManagementPage/ManagementPage';

export default () => (
    <div className="App">
        <Switch>
            <Route
              exact
              path="/"
              render={() => (
                  <ManagementPage />
              )}
            />
        </Switch>
    </div>
);