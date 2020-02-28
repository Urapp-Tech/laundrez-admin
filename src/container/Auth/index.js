import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./Login";

function AuthContainer() {
    return (
        <div className="wrapper">
            <div className="main-panel w-100">
                <Switch>
                    <Route path="/auth/login" component={Login} />
                </Switch>
            </div>
        </div>
    )
}
export default AuthContainer;