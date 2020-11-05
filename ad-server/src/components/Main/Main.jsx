import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ManangementPage from '../Management/ManagementPage';

export default () => (
    <div className="App">
        <Switch>
            <Route
                exact
                path="/"
                render={() => (
                    <ManangementPage />
                )}
            />
        </Switch>
    </div>
);