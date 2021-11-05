import React from 'react';
import { Redirect, Route } from 'react-router';
import { useAuth } from '../hook/useAuth';

export const PrivateRoute = ({ component: C, ...props }) => {
  console.log(useAuth());
  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      render={routeProps =>
        // eslint-disable-next-line react/jsx-props-no-spreading
        true ? <C {...routeProps} /> : <Redirect to="/login" />
      }
    />
  );
};
