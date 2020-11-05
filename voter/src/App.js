import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import { Header } from './Header';
import { Main } from './Main';

import { history } from "./helpers/history";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

const App = () => {

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage());
    });
  }, [dispatch]);

  const logOut = () => { dispatch(logout()); }


  return (
    <Router history={history}>
      <Header />
      <Main />
    </Router>
  );
}
export default App;
