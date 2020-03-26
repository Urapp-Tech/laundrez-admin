import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Login';

function AuthContainer() {
    return (
        <div className="wrapper">
            <div className="main-panel-login">
                <Switch>
                    <Route path="/auth/login" component={Login} />
                </Switch>
            </div>
        </div>
    );
}
export default AuthContainer;