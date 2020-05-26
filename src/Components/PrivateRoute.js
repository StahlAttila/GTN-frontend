import React from 'react';
import { Route, Redirect } from 'react-router-dom';


const PrivateRoute = ({ login, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (sessionStorage.getItem("TOKEN")
      ? <Component {...props} />
      : <Redirect to="/login" />
    )}
  />
);

export default PrivateRoute;