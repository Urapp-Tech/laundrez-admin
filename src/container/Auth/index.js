import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Login';

function AuthContainer() {
    return (
        <div className="wrapper">
            <div className="main-panel-login">
                <Switch>
                    <Route path="/admin/auth/login" component={Login} />
                </Switch>
            </div>
        </div>
    );
}
export default AuthContainer;