import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, useHistory } from 'react-router';

export const PrivateRoute = ({ component: C, ...props }) => {
  const auth  = useSelector(state => state.firebaseReducer.auth);
  const history = useHistory();
  useEffect(() => {
    if (auth.isLoaded && auth.isEmpty) history.push('/');
  }, [auth, history]);

  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      render={routeProps =>
        // eslint-disable-next-line react/jsx-props-no-spreading
        auth != null && auth.uid != null ? <C {...routeProps} /> : <Redirect to="/login" />
      }
    />
  );
};
