import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';
import { getUserFromAuthState } from '../redux/selector/authSelector';

export const PrivateRoute = ({ component: C, ...props }) => {
  const user = useSelector(getUserFromAuthState);
  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      render={routeProps =>
        // eslint-disable-next-line react/jsx-props-no-spreading
        user != null ? <C {...routeProps} /> : <Redirect to="/login" />
      }
    />
  );
};
