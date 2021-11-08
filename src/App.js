import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter, Switch, Route,Redirect } from 'react-router-dom';
import history from './router/history';
import MainLayout from './page/layout/MainLayout';
import Login from './page/auth/login/Login';
import { useFirebase } from 'react-redux-firebase';

function App() {
  return (
    <BrowserRouter history={history}>
      <Switch>
        <Route path="/login" component={Login} />
        <MainLayout />
      </Switch>
    </BrowserRouter>
  );
}
export default hot(App);
