import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import {FormContainer} from "./containers/FormContainer";
import Rooms from './components/Rooms';

export const Main = () => (
  <div className="container mt-3">
    <Switch>
      <Route exact path={["/", "/home"]} component={Rooms} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/profile" component={Profile} />
    </Switch>
  </div>
);