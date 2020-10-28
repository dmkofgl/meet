import { NavLink } from 'react-router-dom';
import React from 'react';
import {FormContainer} from './containers/FormContainer'
import {LoginPage} from './containers/LoginPage';
import { Switch, Route } from 'react-router-dom';
import App from './App';

export const Main = () => (
  <Switch>
  <Route path='/rooms' component={App}></Route>
    <Route path='/' component={LoginPage}></Route>
  </Switch>
);