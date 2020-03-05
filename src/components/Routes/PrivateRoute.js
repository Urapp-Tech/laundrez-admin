import React from 'react';
import PropTypes from "prop-types";
import { Route, Redirect } from 'react-router-dom';
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        (localStorage.getItem('token'))
            ? <Component {...props} />
            : <Redirect to={"/auth/login"} />
    )} />
)
PrivateRoute.propTypes = {
    component: PropTypes.element
}
export default PrivateRoute;