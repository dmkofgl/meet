import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import { FormContainer } from "./containers/FormContainer";
import Rooms from './components/Rooms';
import Room from './components/Room';
import Auth from './components/Auth';

export const Main = () => (
  <div className="container mt-3">
    <Switch>
      <Route exact path={["/", "/home"]} component={Rooms} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/rooms/:id" component={Room} />
      <Route exact path="/auth" component={Auth} />
    </Switch>
  </div>
);