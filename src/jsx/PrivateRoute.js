import React from 'react';
import { Redirect, Route } from 'react-router-dom';
const PrivateRoute = ({ component: Component, ...rest }) => {


  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem('userInfo') ? (
          Component ? (
            <Component {...props} />
          ) : (
            rest.render(props)
          )
        ) : (
          <Redirect to="/page-login" />
        )
      }
    />
  );
};

export default PrivateRoute;
