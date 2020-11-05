import { NavLink } from 'react-router-dom';
import React from 'react';
import { LoginPage } from './containers/LoginPage';
import { Switch, Route } from 'react-router-dom';
import App from './App';
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import {FormContainer} from "./containers/FormContainer";

export const Main = () => (
  <div className="container mt-3">
    <Switch>
      <Route exact path={["/", "/home"]} component={FormContainer} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/profile" component={Profile} />
    </Switch>
  </div>
);