import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./Login";

function AuthContainer() {
    return (
        <div className="wrapper">
            <div className="main-panel height-100 w-100 m-0">
                <Switch>
                    <Route path="/auth/login" component={Login} />
                </Switch>
            </div>
        </div>
    )
}
export default AuthContainer;